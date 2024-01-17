let request = require("request");
let cheerio = require("cheerio");
let getIssuesPageHtml = require("./issue");
function getReposPageHTml(url, topic) {
    request(url, cb);
    function cb(err, response, html) {
        if (err) {
            console.log(err);
        } else if (response.statusCode == 404) {
            console.log("page not found");
        } else {
            // console.log(html);
            getReposLink(html);
        }
    }
    function getReposLink(html) {
        let $ = cheerio.load(html);
        let headingsArr = $(".f3.color-fg-muted.text-normal.lh-condensed");
        console.log(topic);
        for (let i = 0; i < 8; i++) {
            let twoAnchors = $(headingsArr[i]).find("a");
            let link = $(twoAnchors[1]).attr("href");
            // console.log(link);
            let fullLink = `https://github.com/${link}/issues`;
            let repoName = link.split("/").pop(); // name of topic

            // console.log(fullLink);
            getIssuesPageHtml(fullLink, topic, repoName);
        }
        console.log("`````````````````````````````````````````````````````")

    }
}

module.exports = getReposPageHTml;