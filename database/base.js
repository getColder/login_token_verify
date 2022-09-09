const Mysql = require("mysql");
const JsonFile = require("jsonfile")

class mysqlDB{
    constructor(){
        if(!mysqlDB.connection){
           mysqlDB.connection = this.#connect();
        }
        return mysqlDB.connection;
    }

    #connect(dbInfoFileName = __dirname +  "/dbInfo.json"){
        let info = JsonFile.readFileSync(dbInfoFileName);
        let connection = Mysql.createConnection(info);
        if(!connection){
            throw "db error ";
        }
        return connection;
    }
    
}

module.exports = mysqlDB; 


