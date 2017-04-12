#encoding=utf-8
from django.http import HttpResponse
from django.shortcuts import render
import MySQLdb
import time
import json
import traceback
import datetime
from include.utils import *

def index(request):
    response = HttpResponse( json.dumps(queryStop()), "Application/json" )
    return response

def estimate(request):
    try:
        args = [("stop",str)]
        (query,) = requestGET(request.GET, args)
        response = HttpResponse( 
            json.dumps({
                "results":queryEstimate(query)
            }), "Application/json")
    except ValueError as e:
        response = HttpResponse( json.dumps({"status":False}), "Application/json")
        print e
    return response


def weather(request):
    try:
        args = [("city",str)]
        (query,) = requestGET(request.GET, args)
        response = HttpResponse( 
            json.dumps({
                "results":queryWeather(query)
            }), "Application/json")
    except ValueError as e:
        response = HttpResponse( json.dumps({"status":False}), "Application/json")
        print e
    return response


def search(request):
    try:
        args = [("query", str)]
        (query,) = requestGET(request.GET, args) 
        response = HttpResponse( 
            json.dumps({
                "results": queryStops(query)
            }), "Application/json")
    except ValueError as e:
        response = HttpResponse( json.dumps({"status":False}), "Application/json")
        print e
    return response


def queryWeather(c):
    try:
        city = c
        dd = datetime.datetime.today().strftime("%Y-%m-%d")
        hh = int(datetime.datetime.today().strftime("%H"))
        sql = \
        """
        SELECT
            t.degree, p.degree
        FROM
            sb_realtime.WeatherTemp t,  sb_realtime.WeatherPoP p
        WHERE
            t.district = '%s' AND
            p.district = '%s' AND
            p.date = '%s' AND
            t.date = '%s' AND
            t.hour = '(select hour from sb_realtime.WeatherTemp order by ABS(hour - %s))' AND
            p.hour = '(select hour from sb_realtime.WeatherPoP order by ABS(hour - %s))'
        """%(city,city,dd,dd,hh,hh)
        
        d,c = db_connect()
        c.execute(sql)
        print c._executed
        t, p = c.fetchone()
        
        return {"temp":t, "pop":p}

            
    except Exception, e:
        traceback.print_exc()
    return

def nearby(request):
    try:
        args = [("lat0", float), ("lat1", float), ("lng0", float), ("lng1", float)]
        lat0, lat1, lng0, lng1 = requestGET( request.GET, args )
    	response = HttpResponse(
            json.dumps({
                "stops": queryNearBy(
                    [lat0,lat1], [lng0,lng1]
                )
            }), "Application/json" )
    except ValueError:
        traceback.print_exc()
	response = HttpResponse( json.dumps({"status":False}), "Application/json" )
    return response

def nearest(request):
    try:
        args = [("lat",str),("lng",str)]
        lat, lng = requestGET( request.GET, args )
        response = HttpResponse(
            json.dumps({
                "nearest": queryNearest( lat, lng )
            }), "Application/json" )
    except ValueError:
	    response = HttpResponse( json.dumps({"status":False}), "Application/json" )
    return response


def queryStops(query):
    db, cursor = db_connect()
    sql = """
        SELECT DISTINCT
            s.name, GROUP_CONCAT(DISTINCT r.name ORDER BY r.name ASC SEPARATOR ', ')
        FROM
            sb_ref.Stops s
        JOIN
            sb_ref.Routes r
        ON
            s.routeid = r.routeid
        WHERE
            CONCAT('@@', s.name,s.name, '@@') LIKE \"%%%s%%\"
        GROUP BY
            s.name
        ORDER BY
            s.name, r.name
        """%query.decode("utf-8")
    #sql = "SELECT DISTINCT s.name, GROUP_CONCAT(DISTINCT r.name ORDER BY r.name ASC) FROM GoogleStops s JOIN GoogleRoutes r on s.place_id = r.place_id\
    #        WHERE CONCAT('@@', s.name,s.name, '@@') LIKE \"%%%s%%\" group by s.name order by s.name, r.name"%query.decode("utf-8")
    #sql = "SELECT DISTINCT s.name, r.name FROM GoogleStops s JOIN GoogleRoutes r on s.place_id = r.place_id\
    #        WHERE CONCAT('@@', s.name,s.name, '@@') LIKE \"%%%s%%\" order by s.name, r.name"%query.decode("utf-8")
    data = []
    try:
        db_execute(cursor,sql)
        results = cursor.fetchall()
        data = []
        for i in range(cursor.rowcount):
            stop , routes = results[i]
            data.append({
                "stop": stop,
                "routes":routes
            })
    except Exception, e:
        return "Error: unable to fecth data: "+str(e)
    db.close()
    return data


def queryNearBy(lat,lng):
    db, cursor = db_connect()
    if lat[0] > lat[1]:
        lat[0], lat[1] = lat[1], lat[0]
    if lng[0] > lng[1]:
        lng[0], lng[1] = lng[1], lng[0]
    sql = "(SELECT StopID, Name, Latitude,Longitude FROM StopsTPE WHERE\
		Latitude  >= %f AND\
		Longitude >= %f AND\
		Latitude  <= %f AND\
		Longitude <= %f \
        GROUP BY ( CONCAT( TRUNCATE(Latitude,9), TRUNCATE(Longitude,9)) ))\
	" % (lat[0],lng[0],lat[1],lng[1])
    sql+= "UNION All (SELECT StopID, Name, Latitude, Longitude FROM StopsNTPC WHERE\
		Latitude  >= %f AND\
		Longitude >= %f AND\
		Latitude  <= %f AND\
		Longitude <= %f \
        GROUP BY ( CONCAT( TRUNCATE(Latitude,9), TRUNCATE(Longitude,9)) ))\
	" % (lat[0],lng[0],lat[1],lng[1])
    sql = """
            SELECT
                s.place_id, s.name, s.latitude, s.longitude/*, GROUP_CONCAT(r.name SEPARATOR ', ')*/
            FROM
                sb_ref.GoogleStops s
            /*RIGHT
            JOIN
                sb_ref.Stops s
            ON
                s.name = gs.name*/
            WHERE
        		s.latitude  >= %f AND
        		s.longitude >= %f AND
		        s.latitude  <= %f AND
		        s.longitude <= %f 
            LIMIT
                300
	    """ % (lat[0],lng[0],lat[1],lng[1])
    data = []
    try:
    	db_execute(cursor, sql)
        results = cursor.fetchall()
        for i in range(cursor.rowcount):
            place, stop, lat, lng = results[i]
            data.append({
                "id":   place,
                "name": stop.decode('utf-8'),
                "routes": "",#routes.decode('utf-8'),
                "lat":  lat,
                "lng"   :lng
            })
    except Exception, e:
        traceback.print_exc()
        return "Error: unable to fecth data: "+str(e)
    db.close()
    return data

def queryNearest(lat,lng):
    db, cursor = db_connect()
    sql =   """
            SELECT
                place_id, name, latitude, longitude, 
                SQRT(
                    POW(69.1 * (latitude - %s), 2) +
                    POW(69.1 * (%s - longitude) * COS(latitude / 57.3), 2)
                    ) AS distance
            FROM
                sb_ref.Stops
            HAVING
                distance < 25
            ORDER BY
                distance
            LIMIT
                1
            """% (lat, lng)
    data = []
    try:
        db_execute(cursor,sql)
        results = cursor.fetchall()
        for i in range( cursor.rowcount ):
            placeid, name, lat, lng, dst = results[i]
            data.append({
                "id":   placeid,
                "name": name,
                "lat":  lat,
                "lng":  lng,
                "distance": dst
            })
    except Exception, e:
       return "Error: unable to fecth data "+str(e)
    db.close()
    return data


def queryEstimate(name):
    db, cursor = db_connect()
    sql = \
    """ 
    SELECT
        e.routeid, s.name, max(s.goDestination), max(s.goDeparture),
        max(IF (e.direction = '0', e.estimateTime, NULL)) as goDstEstimate,
        max(IF (e.direction = '1', e.estimateTime, NULL)) as goDepEstimate,
        max(IF (e.direction = '0', e.recordTime,   NULL)) as goDstRecord,
        max(IF (e.direction = '1', e.recordTime,   NULL)) as goDepRecord

    FROM
        sb_realtime.Estimate e,
        (
            SELECT
                s.stopid, s.direction, s.routeid, r.name, 
                IF (s.direction = '0', r.destination, NULL ) as goDestination,
                IF (s.direction = '1', r.departure, NULL) as goDeparture
            FROM
                sb_ref.Stops s, sb_ref.Routes r
            WHERE
                s.name = '%s' AND
                s.routeid = r.routeid
        ) as s
    WHERE
        e.stopid = s.stopid AND
        e.routeid = s.routeid AND
        e.direction = s.direction
    GROUP BY
        s.name
    ORDER BY
        s.name
    
    """%(name)

    cursor.execute(sql)
    data = []
    for i in range(cursor.rowcount):
        rid, name, dst, dep, dstesti, depesti, dstrecord, deprecord = cursor.fetchone()
        dstrecord = str(int(time.mktime(dstrecord.timetuple()))) if not isinstance(dstrecord, type(None)) else None
        deprecord = str(int(time.mktime(deprecord.timetuple()))) if not isinstance(deprecord, type(None)) else None
        data += [{
            "route":rid,
            "rname":name,
            "dst":dst,
            "dep":dep,
            "dstesti":dstesti,
            "depesti":depesti,
            "dstrecord": dstrecord,
            "deprecord": deprecord
            }]
    return data



