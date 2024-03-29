let url = "https://github.com/topics";
let request = require("request");
let cheerio = require("cheerio");
let getReposPageHTml = require("./RepoPage");
request(url, cb);
function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else if (response.statusCode == 404) {
        console.log("page not found");
    } else {
        // console.log(html);
        getTopicLinks(html);
    }
}

function getTopicLinks(html) {
    let $ = cheerio.load(html);
    let linkElemArr = $(".no-underline.d-flex.flex-column.flex-justify-center");
    for (let i = 0; i < linkElemArr.length; i++) {
        let href = $(linkElemArr[i]).attr("href");
        let topic = href.split("/").pop(); // gets the last value
        let fullLink = `https://github.com/${href}`;
        // console.log(fullLink);
        getReposPageHTml(fullLink, topic);
    }
}
