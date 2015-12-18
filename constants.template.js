function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true
    });
}

define("PI", 3.14);
define("mysql", {
    login: {
        host: 'localhost',
        user: 'me',
        password: 'secret',
        database: 'my_db'
    }
});

define("papertrail", {
    login: {
        username: "user",
        password: "pass"
    }
});


