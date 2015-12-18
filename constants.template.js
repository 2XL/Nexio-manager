function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true
    });
}

define("PI", 3.14);
define("mysql", {
    server: {
        host: 'localhost',
        port: 8086,
        username: 'root',
        password: 'root',
        database: 'metrics',
    },
    db: {
        name: 'metrics',
        user: 'test',
        pass: 'test'
    }

});
