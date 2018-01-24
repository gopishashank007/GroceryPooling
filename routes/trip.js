exports.request = function (req, res) {
    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (err, connection) {
        var date = new Date();

        var data = {
            riderid: input.id,
            ridermsg: input.message,
            status: 'Request',
            requestDate: input.datetime
        };
        var query = connection.query("INSERT INTO TripRequestDtls SET ? ", data, function (err, rows) {
            if (err)
                console.log("Error inserting : %s ", err);

            res.redirect('/showdriver/' + input.id);
        });
    });
};

exports.pending = function (req, res) {
    var input = JSON.parse(JSON.stringify(req.body));
    console.log(input);

    req.getConnection(function (err, connection) {
        var date = new Date();

        var id = input.tripid;
        var data = {
            driverid: input.driverid,
            remarks: input.message,
            esttravelcost: input.estcost,
            status: 'Pending'
        };
        var query = connection.query("UPDATE TripRequestDtls SET ? WHERE ID = ?", [data, id], function (err, rows) {
            if (err)
                console.log("Error inserting : %s ", err);

            res.redirect('/showrider/' + input.driverid);
        });
    });
};

exports.accept = function (req, res) {
    var input = JSON.parse(JSON.stringify(req.body));
    console.log(input);

    req.getConnection(function (err, connection) {
        var date = new Date();

        var id = input.tripid;
        var data = {
            status: 'Approve',
            approvedate: date
        };
        var query = connection.query("UPDATE TripRequestDtls SET ? WHERE id = ?", [data, id], function (err, rows) {
            if (err)
                console.log("Error inserting : %s ", err);

            res.redirect('/showdriver/' + input.riderid);
        });
    });
};

exports.showaccept = function (req, res) {
    req.getConnection(function (err, connection) {
        var query = connection.query("SELECT A.*, B.RiderName FROM TripRequestDtls A, RiderRegDtls B WHERE A.RiderId = B.Id And A.Status = 'Approve' ORDER BY A.RequestDate", function (err, rows) {
            if (err)
                console.log("Error Selecting : %s ", err);
            console.log(rows);
            res.render('showdriveraccept', {
                title: 'Registered Riders',
                data: rows
            });
        });

    });
};
