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
    },
    query: {
        queryName1: "",
        queryName2: "",
        queryName3: "",
        queryName4: ""
    }
});

define("papertrail", {
    profile: {
        token: "XXX",
        baseUrl: "https://papertrailapp.com/api/v1/" //
    }
});


