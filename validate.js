var fs = require('fs');

var files = fs.readdirSync(__dirname);
var promises = [];

files.forEach(function(f) {
    if (f === ".git") return;
    if (f === "node_modules") return;

    var path = "./" + f;

    if (fs.lstatSync(path).isDirectory()) {
        promises.push(createValidationPromise(path))
    }
})

Promise.all(promises)
.then(function() {
    console.log("Content validation succeeded.");
})
.catch(function(reason) {
    console.error("Content validation failed: " + reason)
});

function createValidationPromise(path) {
    var p = new Promise(function(resolve, reject) {
        var parse = require(path + "/parser.js");

        console.log("Validating content in directory: " + path)

        var files = fs.readdirSync(path)
        files.forEach(function(f) {
            if (f === "parser.js") return;

            var err, data = fs.readFileSync(path + "/" + f);
            if (err) return reject(err);

            var result = parse(String(data));
            if (result.length == 0) {
                return reject("Failed to parse " + path + "/" + f);
            }
        })

        resolve();
    });

    return p;
}
