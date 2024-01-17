let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
let path = require("path");
let pdfkit = require("pdfkit");
function getIssuesPageHtml(url, topic, repoName) {
    request(url, cb);
    function cb(err, response, html) {
        if (err) {
            console.log(err);
        } else if (response.statusCode == 404) {
            console.log("page not found");
        } else {
            // console.log(html);
            getIssues(html);
        }
    }
    function getIssues(html) {
        let $ = cheerio.load(html);
        let IssuesArr = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
        console.log(IssuesArr.length);
        let arr = [];
        for (let i = 0; i < IssuesArr.length; i++) {
            let link = $(IssuesArr[i]).attr("href");
            // console.log(link);
            arr.push(link);
            // console.log(topic, "", arr);         
        }
        let folderPath = path.join(__dirname, topic);
        dirCreator(folderPath);
        let filePath = path.join(folderPath, repoName + ".pdf");
        console.log(filePath);
        // let filePath = path.join(folderPath, repoName + ".json");
        // fs.writeFileSync(filePath,JSON.stringify(arr));
        let text = JSON.stringify(arr);
        let pdfDoc = new pdfkit();
        pdfDoc.pipe(fs.createWriteStream(filePath));
        pdfDoc.text(text);
        pdfDoc.end();

    }
}
module.exports = getIssuesPageHtml;
function dirCreator(folderPath) {
    if (fs.existsSync(folderPath) == false) {
        fs.mkdirSync(folderPath);
    }
}