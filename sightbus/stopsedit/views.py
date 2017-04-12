from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render
import MySQLdb
import time
import json
import traceback

def index(request):

    context = {
        'id':1
    }
    template = loader.get_template('index.html')
    return HttpResponse(template.render(context, request))  
def progress(request):
    response = HttpResponse( json.dumps({"status":True,"results":queryProgress()}), "Application/json")
    return response

def update(request):
    try:
        if request.GET.get("id", None) != None and request.GET.get("place_id", None) != None:
            stop = str(request.GET.get("id", None).encode("utf-8"))
            place = str(request.GET.get("place_id", None).encode("utf-8"))
            response = HttpResponse( "<script>" + queryUpdate(stop, place) + "</script>", "text/HTML")
        else:
            response = HttpResponse( "<script> parent.f_invaild(); </script>", "text/HTML")
    except ValueError as e:
        response = HttpResponse( "<script> parent.f_fail(); </script>", "text/HTML")
        print e
    return response


def search(request):
    try:
        if request.GET.get("query", None) != None:
            query = str(request.GET.get("query", None).encode("utf-8"))
            print query
            response = HttpResponse( json.dumps({"results":queryStops(query)}), "Application/json")
        else:
            response = HttpResponse( json.dumps({"status":False}), "Application/json")
    except ValueError as e:
        response = HttpResponse( json.dumps({"status":False}), "Application/json")
        print e
    return response


def nearby(request):
    try:
        lat = [ float(request.GET.get("lat0",None)), float(request.GET.get("lat1",None)) ]
        lng = [ float(request.GET.get("lng0",None)), float(request.GET.get("lng1",None)) ]
        cate = int(request.GET.get("cate", None))
        if lat[0] == None or lat[1] == None or lng[0] == None or lng[1] == None or cate == None:
    	    response = HttpResponse( json.dumps({"status":False}), "Application/json" )
	response = HttpResponse( json.dumps({"stops":queryNearBy( lat, lng, cate )}), "Application/json" )
    except ValueError:
        traceback.print_exc()
	response = HttpResponse( json.dumps({"status":False}), "Application/json" )
    return response

def nearest(request):
    try:
        lat = float(request.GET.get("lat",None))
        lng = float(request.GET.get("lng",None))
        if lat == None or lat == None :
    	    response = HttpResponse( json.dumps({"status":False}), "Application/json" )
	response = HttpResponse( json.dumps({"nearest":queryNearest( lat, lng )}), "Application/json" )
    except ValueError:
	response = HttpResponse( json.dumps({"status":False}), "Application/json" )
    return response


def queryStops(query):
    db = MySQLdb.connect("localhost","root", PASSWORD_HAS_BEEN_REMOVED, DATABASE_HAS_BEEN_REMOVED)
    cursor = db.cursor()
    sql = "SELECT DISTINCT s.name, GROUP_CONCAT(DISTINCT r.name ORDER BY r.name ASC)  FROM Stops s JOIN Routes r on s.routeid = r.routeid\
            WHERE CONCAT('@@', s.name,s.name, '@@') LIKE \"%%%s%%\" group by s.name order by s.name, r.name"%query.decode("utf-8")
    #sql = "SELECT DISTINCT s.name, GROUP_CONCAT(DISTINCT r.name ORDER BY r.name ASC) FROM GoogleStops s JOIN GoogleRoutes r on s.place_id = r.place_id\
    #        WHERE CONCAT('@@', s.name,s.name, '@@') LIKE \"%%%s%%\" group by s.name order by s.name, r.name"%query.decode("utf-8")
    #sql = "SELECT DISTINCT s.name, r.name FROM GoogleStops s JOIN GoogleRoutes r on s.place_id = r.place_id\
    #        WHERE CONCAT('@@', s.name,s.name, '@@') LIKE \"%%%s%%\" order by s.name, r.name"%query.decode("utf-8")
    data = []
    try:
        # Execute the SQL command
        cursor.execute("SET NAMES utf8;")
        cursor.execute("SET CHARACTER SET utf8;")
        cursor.execute('SET character_set_connection=utf8;')
        cursor.execute(sql)
        results = cursor.fetchall()
        #cursor.execute(sql2)
        #results += cursor.fetchall()
        data = []
        currStop = ""
        buffers = ""
        for i in range(cursor.rowcount):
#        for row in results:
#            if currStop == "":
#                currStop = row[0]
#            if currStop != row[0]:
#                data.append({"stop":currStop, "routes":buffers})
#                currStop = row[0]
#                buffers = ""
#            buffers+=(", " if len(buffers) > 0 else "") + row[1]
            stop , routes = results[i]
            data.append({"stop":stop, "routes":routes})
        
        #cursor.execute(sqlN)
        #results = cursor.fetchall()
        #for row in results:
        #    data.append( { "id":row[0], "name":row[1], "departure":row[2], "destination":row[3] } );
    
    except Exception, e:
        return "Error: unable to fecth data: "+str(e)
    # disconnect from server
    db.close()
    return data


def queryNearBy(lat,lng, cate):
    db = MySQLdb.connect("localhost","root", PASSWORD_HAS_BEEN_REMOVED, DATABASE_HAS_BEEN_REMOVED)
    cursor = db.cursor()
    if lat[0] > lat[1] :
        tmp = lat[0]
        lat[0] = lat[1]
        lat[1] = tmp
    if lng[0] > lng[1] :
        tmp = lng[0]
        lng[0] = lng[1]
        lng[1] = tmp
    sql = "SELECT s.place_id, s.name, s.latitude, s.longitude, GROUP_CONCAT(COALESCE(r.name,'') ORDER BY r.name SEPARATOR ', ' ), s.place_id \
            FROM GoogleStops s\
            LEFT JOIN GoogleStopOfRoute sr\
            ON      s.place_id = sr.place_id\
            LEFT JOIN GoogleRoutes r\
            ON      sr.sb_route_id = r.sb_route_id\
            WHERE\
		s.latitude  >= %f AND\
		s.longitude >= %f AND\
		s.latitude  <= %f AND\
		s.longitude <= %f \
            GROUP BY s.place_id\
    	" % (lat[0],lng[0],lat[1],lng[1])
    if cate > 0:
        sql = "SELECT s.stopid, s.name, s.latitude, s.longitude, GROUP_CONCAT(r.name ORDER BY r.name SEPARATOR ', ' ), s.place_id \
            FROM Stops s\
            RIGHT JOIN Routes r\
            ON  s.routeid = r.routeid\
            WHERE\
		s.latitude  >= %f AND\
		s.longitude >= %f AND\
		s.latitude  <= %f AND\
		s.longitude <= %f \
            GROUP BY s.stopid\
    	" % (lat[0],lng[0],lat[1],lng[1])

    data = []
    try:
    	cursor.execute("SET NAMES utf8")
    	cursor.execute("SET CHARACTER SET utf8")
        cursor.execute(sql)
        results = cursor.fetchall()
        for i in range(cursor.rowcount):
            place, stop, lat, lng, routes, place_id = results[i]
            data.append({"id":place, "name":stop.decode('utf-8'), "routes":routes.decode('utf-8'), "lat":lat, "lng":lng, "cate":cate, "place_id": place_id})
 
    except Exception, e:
        traceback.print_exc()
        return "Error: unable to fecth data: "+str(e)
    db.close()
    return data

def queryNearest(lat,lng):
    db = MySQLdb.connect("localhost","root", PASSWORD_HAS_BEEN_REMOVED, DATABASE_HAS_BEEN_REMOVED)
    cursor = db.cursor()
    sql = "SELECT place_id, name, latitude, longitude, SQRT(\
                POW(69.1 * (latitude - %s), 2) +\
                POW(69.1 * (%s - longitude) * COS(latitude / 57.3), 2)\
           ) AS distance\
           FROM GoogleStops HAVING distance < 25 ORDER BY distance LIMIT 1"% (lat, lng)

    data = []
    try:
        # Execute the SQL command
    	cursor.execute("SET NAMES utf8")
    	cursor.execute("SET CHARACTER SET utf8")
        cursor.execute(sql)
        results = cursor.fetchall()
        for row in results:
            for col in row:
                print col
            data.append({"id":row[0], "name":row[1], "lat":row[2], "lng":row[3], "distance":row[4]})
    except Exception, e:
       return "Error: unable to fecth data"+str(e)
    # disconnect from server
    db.close()
    return data



def queryUpdate(stop, placeid):
    db, cursor = db_connect()
    sql = "SELECT * FROM Stops WHERE stopid = '%s'"%stop
    cursor.execute(sql)
    if cursor.rowcount == 0:
        return "parent.f_not_exist();console.log('stop not exist');;parent.err_pin('"+stop+"');"
    sql = "SELECT * FROM GoogleStops WHERE place_id = '%s'"%placeid
    cursor.execute(sql)
    if cursor.rowcount == 0:
        return "parent.f_not_exist();console.log('place not exist');;parent.err_pin('"+stop+"');"
    sql = "UPDATE Stops \
            SET place_id = '%s'\
            WHERE stopid = '%s' "%(placeid, stop)
    cursor.execute(sql)
    db.commit()
#    data = []
#    for i in range(cursor.rowcount):
#        data += cursor.fetchone()
    return "parent.f_success();parent.ok_pin('"+stop+"');"

def queryProgress():
    db, cursor = db_connect()
    cursor.execute("select count(*) from Stops")
    total = cursor.fetchone()[0]
    cursor.execute("select count(*) from Stops where place_id != ''")
    finish = cursor.fetchone()[0]
    return {"finish":finish, "total":total}

def db_connect():
    db = MySQLdb.connect("localhost","root", PASSWORD_HAS_BEEN_REMOVED, DATABASE_HAS_BEEN_REMOVED)
    cursor = db.cursor()
    db.set_character_set('utf8')
    cursor.execute('SET NAMES utf8;')
    cursor.execute('SET time_zone = "+08:00";')
    cursor.execute('SET GLOBAL time_zone = "+8:00";')
    return (db, cursor)

