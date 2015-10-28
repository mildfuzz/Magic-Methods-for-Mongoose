module.exports = function(schema) {
    function findBy(key, method) {
        return function(value, cb) {
            var query = {};
            query[key] = value;
            console.log(query);
            return this[method](query, cb);
        }
    }

    var keys = Object.keys(schema.paths).filter((key) => {return !!key[0].match(/[a-zA-Z]/)});
        titleKeys = keys.map((key) => {return key.replace(/\w/, function(txt) {return txt.charAt(0).toUpperCase()});});

    keys.forEach((key, i) => {
        var method = schema.paths[key].options.unique ? 'findOne' : 'find';
        schema.statics['findBy' + titleKeys[i]] = findBy(key, method);
    });
}