exports.login = function (req, res) {
    res.render('login', {
        title: 'User Login'
    });
};

exports.checklogin = function (req, res) {
    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (err, connection) {
        var username = input.username;
        var password = input.password;
        var sql = 'SELECT COUNT(1) CNT, UserType, UserId FROM UserLogin WHERE UserName = ? AND Password = ?';

        var query = connection.query(sql, [username, password], function (err, result, fields) {
            if (err)
                console.log("Error inserting : %s ", err);

            if (result[0].CNT == 1) {
                if (result[0].UserType == 'R') {
                    res.redirect('/showdriver/' + result[0].UserId);
                } else if (result[0].UserType == 'D') {
                    res.redirect('/showrider/' + result[0].UserId);
                }
            } else {
                res.render('login', {
                    errmsg: 'Invalid Login. Please try again.'
                });
            }
        });
        // console.log(query.sql); get raw query
    });
};

exports.register = function (req, res) {
    res.render('register', {
        title: 'Registration'
    });
};

exports.registersave = function (req, res) {
    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (err, connection) {
        var date = new Date();

        if (input.type == '1') {
            var data = {
              ridername: input.name,
              age: input.age,
              gender: input.gender,
              cityid: input.city,
              stateid: input.state,
              address: input.address,
              mobileno: input.mobile,
              location: input.location,
              IsActive:1,
              CreatedBy:input.name,
              //usertype: 'R',
              createddate: date
            };
            debugger;
            var query = connection.query("INSERT INTO RiderRegDtls SET ? ", data, function (err, rows) {
                if (err)
                    console.log("Error inserting : %s ", err);

                var sql = "INSERT INTO UserLogin SET ?";
                var values = {
                    userid: rows.insertId,
                    username: input.username,
                    password: input.username,
                    usertype: 'R'
                };

                var query1 = connection.query(sql, values, function (err, rows) {
                    if (err)
                        console.log("Error inserting : %s ", err);

                    res.redirect('/');
                });
            });
        } else if (input.type == '2') {
            var data = {
              drivername: input.name,
              age: input.age,
              gender: input.gender,
              cityid: input.city,
              stateid: input.state,
              address: input.address,
              mobileno: input.mobile,
              vehicleno: input.vehno,
              location: input.location,
              IsActive:1,
              CreatedBy:input.name,
              createddate: date
            };
            var query = connection.query("INSERT INTO DriverRegDtls SET ? ", data, function (err, rows) {
              debugger;
                if (err)
                    console.log("Error inserting : %s ", err);

                var sql = "INSERT INTO UserLogin SET ?";
                var values = {
                    userid: rows.insertId,
                    // userid:input.username,
                    username: input.username,
                    password: input.username,
                    usertype: 'D'
                };

                var query1 = connection.query(sql, values, function (err, rows) {
                    console.log(query1.sql);
                    if (err)
                        console.log("Error inserting : %s ", err);

                    res.redirect('/');
                });
            });
        }
        /*var query = connection.query("INSERT INTO customers set ? ",data, function(err, rows)
        {
          if (err)
              console.log("Error inserting : %s ",err );
          res.redirect('/customers');
        });*/

        // console.log(query.sql); get raw query
    });
};
