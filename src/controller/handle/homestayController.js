const fs = require("fs");
const qs = require("qs");
const homestayService = require("../../service/homestayService");
class HomestayController {
    getHtmlHomestay = (homestay, indexHtml) => {
        let homestayHtml = ""
        homestay.map(item => {
            homestayHtml += `
            <tr>
                <th scope="row">${item.homestayId}</th>
                <td>${item.homestayName}</td>               
                <td>${item.city}</td>
                <td>${item.price}</td>
                <td>
                <a type="button" class="btn btn-outline-info" href="/edit/${item.homestayId}">Sửa</a>
                <a type="button" class="btn btn-outline-warning" href="/delete/${item.homestayId}">Xóa</a>
                </td>
            </tr>
            `
        })

        indexHtml = indexHtml.replace("{homestayList}", homestayHtml);
        return indexHtml;
    }

    showHome = (req, res) => {
        if (req.method === "GET") {
            fs.readFile("./src/view/index.html", "utf-8", async (err, indexHtml) => {
                let homestay = await homestayService.findAll();
                indexHtml = this.getHtmlHomestay(homestay, indexHtml)
                res.write(indexHtml);
                res.end()
            })
        } 
    }

    homestayAdd = (req, res) => {
      try{
        if (req.method === "GET") {
            fs.readFile("./src/view/homestay/add.html", "utf-8", (err, addHtml) => {
            res.write(addHtml);
            res.end();
            })
        } else {
            let data = ""
            res.on("data", chunk => {
                data += chunk;
            })
            req.on("end", async () => {
                
                let homestay = qs.parse(data);
                console.log(homestay);
                await homestayService.homestayAdd(homestay)
                res.writeHead(301, {"location": "/home"});
                res.end();
            })
      }
        }
        catch(err){
            console.log(err.message)
        }
    }

    homestayEdit = (req, res, idEdit) => {
        console.log(idEdit);
        if (req.method === 'GET') {
            fs.readFile('./src/view/homestay/edit.html', 'utf-8', async (err, editHtml) => {
                let homestay = await homestayService.findById(idEdit);
                editHtml = editHtml.replace("{homestayName}", homestay.homestayName);
                editHtml = editHtml.replace("{city}", homestay.city);
                editHtml = editHtml.replace("{numberBedroom}", homestay.numberBedroom);
                editHtml = editHtml.replace("{price}", homestay.price);
                editHtml = editHtml.replace("{numberToilet}", homestay.numberToilet);
                editHtml = editHtml.replace('{description}', homestay.description);
                res.write(editHtml);
                res.end();
            })
        } else {
            let data = "";
            req.on("data", (chunk) => {
                data += chunk;
            })
            req.on("end", () => {
                let homestay = qs.parse(data);
                console.log(homestay);
                homestayService.homestayEdit(idEdit, homestay);
                res.writeHead(301, {"location": "/home"});
                res.end();
            })
        }
    }

    homestayDelete = (req, res, id) => {
        homestayService.homestayDelete(id);
        res.writeHead(301, {"location": "/home"});
        res.end();
    }
}

module.exports = new HomestayController();