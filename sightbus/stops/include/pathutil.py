#!/usr/bin/python
# -*- coding: utf-8 -*-.
import sys, time, datetime
from include.utils import *
from math import ceil

def pathGet(db, cursor, dep, dst):
    print dep, dst
    print "SQL START"
    getpath =\
    """
    SELECT
        t3.*, e.estimateTime, e.recordtime
    FROM
    (
        SELECT
            t2.routeid, t2.name, t2.direction, t2.far, t2.depid, s2.stopid as dstid, t2.routedst
        FROM
        (
            SELECT
                t.routeid, t.name, t.direction, t.far, s1.stopid as depid, t.routedst
            FROM
            (
                 SELECT
                     p.routeid, r.name, p.direction, p.far, r.destination as routedst
                 FROM
                     sb_ref.Path p, sb_ref.Routes r
                 WHERE 
                     p.dep = '%s' AND
                     p.dst = '%s' AND
                     p.routeid = r.routeid
                 GROUP BY
                     routeid, name, direction
            ) AS t, sb_ref.Stops s1
            WHERE
                s1.routeid = t.routeid AND
                s1.name = '%s' AND
                s1.direction = t.direction 
        ) AS t2, sb_ref.Stops s2
        WHERE
            s2.routeid = t2.routeid AND
            s2.name = '%s' AND
            s2.direction = t2.direction 
    ) AS t3, sb_realtime.Estimate e
    WHERE
        e.routeid = t3.routeid AND
        e.stopid = t3.depid AND
        e.direction = t3.direction

    """%(dep, dst, dep, dst)
    cursor.execute(getpath)
    print "SQL STOP"
    results = cursor.fetchall()
    paths =[]
    print len(results)
    if len(results) > 0:
        for path in results:
            route, name, direction, far, depid, dstid, dst, estimate, update = path
            avg = avgPast( cursor, str(route), str(direction), str(depid), str(dstid) )
            if avg < 0:
                print "ERR, AVG is 0"
                avg = avgPast( cursor, str(route), str(direction), str(depid), str(dstid), hours=-2 )
                print "NEW avg", avg
            paths += [{
                "depid": depid,
                "dstid": dstid,
                "dst": dst,
                "route": route,
                "name": name,
                "direction": direction,
                "far": far,
                "avgTime":avg,
                "time"  : str(int(estimate) + (-30 if len(route) > 8 else 0)),
                "update": str(int(time.mktime(update.timetuple()))),
            }]
            print dep, dst   
    #        print avgPast( cursor, str(route), str(direction), str(depid), str(dstid) )
    #        print avgPast( cursor, '0400081000','0','2205500060', '2425500562' )/60
    #        for j in range( len(paths) ):
    #            print "%s %s %s %s"%(paths[j][0], paths[j][1], paths[j][2], paths[j][3])
    
        return paths
    else:
        print "Generating"
        pathfinding = """
            INSERT INTO sb_ref.Path( dep, dst, routeid, direction, far )
            (
                SELECT
                    a.name, b.name, a.routeid, a.direction, b.seq-a.seq
                FROM
                    sb_ref.Stops a, sb_ref.Stops b
                WHERE
                    a.name = '%s' AND
                    b.name = '%s' AND
                    a.seq < b.seq AND
                    a.direction = b.direction AND
                    a.routeid = b.routeid
            )
        """%(dep, dst)
        if db_commit(db, cursor, pathfinding) > 0:            
            return pathGet(db, cursor, dep, dst)



def getPastHour():
    today = datetime.datetime.today()
    #if int(today.strftime("%H")) in (5):
    #    return None
    if int(today.strftime("%M")) < 15:
        return today + datetime.timedelta(hours=-2)
    return today + datetime.timedelta(hours=-1)

def avgPast(cursor, route, direction, deq, dst, hours = 0):
    print route, direction, deq, dst
    tabletime = getPastHour()
    if hours < 0:
        tabletime = getPastHour() + datetime.timedelta(hours = hours)
    table = tabletime.strftime("%y_%m_%d_%H")
    
    sql = \
        """
        SELECT
            a.depseq, a.depstopid, s1.name, a.dstseq, a.dststopid, s2.name, AVG(a.avg_travel_time)
        FROM
            sb_avgtime.AvgTimeHourly_%s a , sb_ref.Stops s1, sb_ref.Stops s2
        WHERE
            a.depstopid = s1.stopid AND
            a.dststopid = s2.stopid AND
            a.routeid  = "%s" AND
            s1.routeid = "%s" AND
            s2.routeid = "%s" AND
            a.direction = %s

        GROUP BY
            a.depstopid, a.dststopid

        ORDER BY
            a.depseq
        """%( table, route, route, route, direction )
    cursor.execute( sql )
    avgTime = cursor.fetchall()
    total = -1.0
    start = deq
    for i in range( len(avgTime) ):
        if start != avgTime[i][1]:
            continue
        #print avgTime[i][6]
        total += avgTime[i][6]
        start = avgTime[i][4]
        if start == dst:
            break

    return total


