const connection = require("../entity/connection");
class HomestayService {
    connect;
    constructor() {
        connection.connectToMySQL();
        this.connect = connection.getConnection();
    }

    findAll = () => {
        return new Promise((resolve, reject) => {
            this.connect.query(`SELECT * FROM homestay`, (err, homeHtml) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(homeHtml)
                }
            })
        })
    }

    findById = (id) => {
        return new Promise((resolve, reject) => {
            this.connect.query(`SELECT * FROM homestay  WHERE homestayId = ${id};`, (err, findHtml) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(findHtml[0])
                }
            })
        })
    }

    homestayAdd = (homestay) => {
        return new Promise((resolve, reject) => {
            this.connect.query(`INSERT INTO homestay(homestayName, city, numberBedroom, price, numberToilet, description)
            VALUES ("${homestay.homestayName}", "${homestay.city}", ${homestay.numberBedroom}, ${homestay.price}, ${homestay.numberToilet}, "${homestay.description}")`, (err, addHtml) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(addHtml)
                }
            })
        })
    }

    homestayEdit = (id, newHomestay) => {
        console.log(id);
        return new Promise((resolve, reject) => {
            this.connect.query(`UPDATE homestay 
            SET homestayName = "${newHomestay.homestayName}", city = "${newHomestay.city}", numberBedroom = ${newHomestay.numberBedroom}, price = ${newHomestay.price}, numberToilet = ${newHomestay.numberToilet}, description = "${newHomestay.description}"
            WHERE homestayId = ${id};`, (err, editHtml) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(editHtml)
                }
            })
        })
    }

    homestayDelete = (id) => {
        return new Promise((resolve, reject) => {
            this.connect.query(`DELETE FROM homestay WHERE homestayId = ${id};`, (err, deleteHtml) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(deleteHtml); 
                }
            })
        })
    }
}

module.exports = new HomestayService();