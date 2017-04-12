# version 20161203
import MySQLdb
import chardet

def db_connect(db="sb_ref"):
    db = MySQLdb.connect("localhost","root", PASSWORD_HAS_BEEN_REMOVED )
    db.set_character_set('utf8')
    cursor = db.cursor()
    return db, cursor

def db_execute(cursor, sql):
    cursor.execute("SET NAMES utf8")
    cursor.execute("SET CHARACTER SET utf8")
    cursor.execute('SET character_set_connection=utf8;')
    cursor.execute('SET GLOBAL time_zone = "+8:00";')
    cursor.execute(sql)


def db_commit( db, cursor, sql, log="" ):
    try:
        id = cursor.execute(sql)
        db.commit()
        return id
    except MySQLdb.Error, e:
        sys.stdout.write("%sMysql Error %d: %s\n" % (log, e.args[0], e.args[1]))
        sys.stdout.flush()



def requestGET(GET, arg=[]):
    results = ()
    for i in range(len(arg)):
        if GET.get(arg[i][0], None) == None:
            raise ValueError('could not find %s'%arg[i][0])
        _value = GET.get(arg[i][0], None)
        _type = arg[i][1]
        if isinstance(_value, unicode):
            results += ( _type(_value.encode("utf-8")), )
        else:
            results += ( _type(_value), )
    return results



