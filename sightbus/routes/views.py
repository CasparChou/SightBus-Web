#encoding=utf-8
import MySQLdb
import datetime, time
import json
from django.http import HttpResponse
from django.shortcuts import render
from include.utils import *
from include.pathutil import *

def index(request):
    response = HttpResponse( json.dumps(queryStop()), "Application/json" )
    return response

def search(request):
    try:
        args = [("query",str)]
        (query,) = requestGET( request.GET, args )        
        response = HttpResponse(
                json.dumps({
                    "routes": queryRoute( query )
                })
        , "Application/json")
    except ValueError as e:
        response = HttpResponse( json.dumps({"status":False}), "Application/json")
        print e
    return response

def routeplanner(request):
    try:
        args = [("dep",str),("dst",str)]
        (dep,dst,) = requestGET( request.GET, args )        
        response = HttpResponse(
                json.dumps({
                    "routes": queryRoutePlanning( dep, dst )
                })
        , "Application/json")
    except ValueError as e:
        response = HttpResponse( json.dumps({"status":False}), "Application/json")
        print e
    return response

def avgtime(request):
    try:
        args = [("dep",str),("dst",str),("route",str),("direct",str)]
        (dep,dst,route,direct,) = requestGET( request.GET, args )        
        response = HttpResponse(
                json.dumps( queryAvgTime( dep, dst, route, direct ) )
        , "Application/json")
    except ValueError as e:
        response = HttpResponse( json.dumps({"status":False}), "Application/json")
        print e
    return response

def stops(request):
    try:
        args = [("route",str)]
        (route,) = requestGET( request.GET, args )
        response = HttpResponse(
            json.dumps(queryStops(route.encode("utf-8")))
        ,"Application/json")
    except ValueError:
        response = HttpResponse( json.dumps({"status":False}), "Application/json")
    return response


def estimate(request):
    try:
        args = [("route",str)]
        (route,) = requestGET( request.GET, args )
        response = HttpResponse(
            json.dumps(queryEstimate(route.encode("utf-8")))
        ,"Application/json")
    except ValueError:
        response = HttpResponse( json.dumps({"status":False}), "Application/json")
    return response


def queryStops(route):
    db, cursor = db_connect()
    sql =   """
            SELECT
                s.stopid, s.seq, s.direction, s.name
            FROM
                sb_ref.Stops s
            WHERE        
                s.routeid = '%s'
            ORDER BY
                s.direction, s.seq
            """ % (route)
    data = []
    try:
        db_execute(cursor, sql)
        if cursor.rowcount <= 0:
            return {"status":False}
        results = cursor.fetchall()
        stop, seq, name, goback = results[0]
        for i in range(cursor.rowcount):
            stop, seq, goback, name = results[i]
            data.append({
                "stop"  : stop,
                "seq"   : seq,
                "name"  : name,
                "goBack": goback,
            })

    except Exception, e:
       print "Error: unable to fecth data "+str(e)
       return {"status":False}
    db.close()
    return {"stops":data}


def queryEstimate(query):
    db, cursor = db_connect()
    sql =   """
            SELECT
                s.city, s.stopid, s.seq, s.name, e.direction, e.estimateTime, e.recordtime
            FROM
            (
                SELECT
                    stopid, direction, estimateTime, recordtime
                FROM
                    sb_realtime.Estimate
                WHERE
                    routeid = '%s'               
            ) AS e, sb_ref.Stops s
            WHERE        
                s.routeid = '%s' AND
                s.stopid  = e.stopid
            ORDER BY
                e.direction, s.seq;
            """ % (query,query)
    data = []
    try:
        db_execute(cursor, sql)
        if cursor.rowcount <= 0:
            return {"status":False}
        results = cursor.fetchall()
        for i in range(cursor.rowcount):
            city, stop, seq, name, goback, estimate, recordtime = results[i]
            data.append({
                "stop"  : stop,
                "seq"   : seq,
                "name"  : name,
                "goBack": goback,
                "time"  : str(int(estimate) + (-30 if city == "NTPC" else 0)),
                "update": str(int(time.mktime(recordtime.timetuple()))),
                "plate" : None, #plate,
                "event" : None
            })

    except Exception, e:
       print "Error: unable to fecth data "+str(e)
       return {"status":False}
    db.close()
    return {"stops":data, "name":name}


def queryRoute(query):
    db, cursor = db_connect()
    sql = """
        SELECT
            routeid, name, departure, destination 
        FROM
            sb_ref.Routes
        WHERE
            name LIKE \"%%%s%%\" AND
            city != 'TAO'
        ORDER BY
            name ASC
        """ % (query.decode("utf-8"))
    data = []
    try: 
        db_execute(cursor, sql)
        results = cursor.fetchall()

        for i in range(cursor.rowcount):
            routeid, routeName, depart, dest = results[i]
            data.append({
                "id":   routeid, 
                "name": routeName,
                "departure": depart,
                "destination": dest
            });
        

    except Exception, e:
       return "Error: unable to fecth data"+str(e)
    db.close()
    return data

def queryStop():
    time.sleep(3);
    data = '{"route":["99","111","235","513","635","636","637","638","639","797","799","800","801","802","802區","810","842","845","880","883","1501","1503","5009","5675"]}'
    return json.loads(data)

def queryRoutePlanning(dep, dst):
    d, c = db_connect()
    results = pathGet(d, c, dep, dst)
    print results
    return results

def queryAvgTime(dep, dst, route, direction):
    d, c = db_connect()
    return {"avgtime": avgPast( c, str(route), str(direction), str(dep), str(dst) )}

def time_adjust(btime, record):
    return btime
