exports.showdriver = function (req, res) {
    req.getConnection(function (err, connection) {
        var sql = 'SELECT Location, (SELECT DriverId FROM TripRequestDtls WHERE DriverId = A.ID) DriverId FROM DriverRegDtls A WHERE IsActive = 1 ';

        var query = connection.query(sql, function (err, result) {
            if (err)
                console.log("Error inserting : %s ", err);
            var data = result;

            res.locals.docsJSON = JSON.stringify([data]);
            var query = connection.query("SELECT A.*, B.DriverName FROM TripRequestDtls A, DriverRegDtls B WHERE A.DriverId = B.Id And A.Status = 'Pending' ORDER BY A.RequestDate", function (err, rows) {
                if (err)
                    console.log("Error Selecting : %s ", err);
                console.log(rows);
                res.render('showdriver', {
                    title: 'Registered Drivers',
                    data: rows
                });
            });
        });
        // console.log(query.sql); get raw query
    });
};

exports.showrider = function (req, res) {
    req.getConnection(function (err, connection) {
        var sql = "SELECT Location, (SELECT RiderId FROM TripRequestDtls WHERE RiderId = A.ID) RiderId FROM RiderRegDtls A WHERE IsActive = 1";

        var query = connection.query(sql, function (err, result) {
            if (err)
                console.log("Error inserting : %s ", err);
            var data = result;

            res.locals.docsJSON = JSON.stringify([data]);
            var query = connection.query("SELECT A.*, B.RiderName FROM TripRequestDtls A, RiderRegDtls B WHERE A.RiderId = B.Id And A.Status = 'Request' ORDER BY A.RequestDate", function (err, rows) {
                if (err)
                    console.log("Error Selecting : %s ", err);
                
                res.render('showrider', {
                    title: 'Registered Riders',
                    data: rows
                });
            });
        });
    });
};
