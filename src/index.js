const express = require('express');
const establishConnection = require('./databaseConnection');

const app = express();

app.use(express.static('static'));

app.use(express.urlencoded({
    extended: true
}));

app.post('/adminLogin', (request, response) =>{
    if (request.body.uinput == 'admin' && request.body.pinput == '123') {
        response.redirect('/adminPage.html')
    }
    else {
        response.send(`Wrong Username or Password <br /> <button onclick= "location.href= 'admin.html'">Retry login </button>`);
    }
});

app.post('/signUp', (request, response) => {
    let connection = establishConnection();
    connection.connect();
    connection.query(`
    INSERT INTO Customer (username, pswrd, emailAddress, phoneNumber, firstName, lastName)
    VALUES ('${request.body.uinput}', '${request.body.pinput}','${request.body.email}','${request.body.phone}', '${request.body.fname}', '${request.body.lname}')
    `, (err, rows, fields) => {
        if (err) {
            response.send('An error has occurred. Please ensure your username, email and phone number are not currently in use.');
        }
        else {
            response.redirect('/book.html');
        }
    });
    connection.end();
});

app.get('/getBooking/:username', (request, response) => {
    let connection = establishConnection();
    connection.connect();
    connection.query(`
    SELECT b.bookingID, b.busNo, b.bookingDate, e.routeDistance, e.departureTime, e.arrivalTime, r.dStationNo, r.aStationNo, s.addedService
    FROM Booking b 
    NATURAL JOIN EstimatedTime e
    NATURAL JOIN Route r
    NATURAL JOIN Bus s
    WHERE username = '${request.params.username}'
    `, (err, rows, fields) => {
        if (err) {
            response.send('An error has occurred. Please ensure you are using a valid input.');
        }
        else {
            let content = `<link rel='stylesheet' href='/css/param.css'><header id='webheader'><img id='weblogo' src='/css/paramlogo.png'><p id='webname'>SoftwareDrip</p><div id='weboption'><a id='optiontext3' href='/book.html'>Book a Bus</a><a id='optiontext2' href='/check.html'>Check Booking</a><a id='optiontext1' href='/admin.html'>Admin Login</a><button id='signup' onClick="window.location='/signup.html';">Sign Up</button></div></header>`;
            content += `<table id='table9'><tr><th>Booking ID</th><th>Bus Number</th><th>Booking Date</th><th>Route Distance</th><th>Depature Time</th><th>Arrival Time</th><th>Departure Station</th><th>Arrival Station</th><th>Added Service</th></tr>`;
            for (r of rows) {
                let bookDate = new Date(r.bookingDate).toDateString();
                content += `<tr><td>${r.bookingID}</td><td>${r.busNo}</td><td>${bookDate}</td><td>${r.routeDistance}</td><td>${r.departureTime}</td><td>${r.arrivalTime}</td><td>${r.dStationNo}</td><td>${r.aStationNo}</td><td>${r.addedService}</td></tr>`;
            }
            content += '</table>';
            response.send(content);
        }
    });
    connection.end();
});

app.get('/priceMultiplier', (request, response) => {
    let connection = establishConnection();
    connection.connect();
    connection.query(`
    SELECT price, routeDistance
    FROM EstimatedCost;
    `, (err, rows, fields) => {
        if (err) {
            response.send('An error has occurred. Please ensure you are using a valid input.');
        }
        else {
            let content = `<link rel='stylesheet' href='template.css'><header id='webheader'><img id='weblogo' src='logo.png'><p id='webname'>SoftwareDrip</p><div id='weboption'><a id='optiontext3' href='/book.html'>Book a Bus</a><a id='optiontext2' href='/check.html'>Check Booking</a><a id='optiontext1' href='/admin.html'>Admin Login</a><button id='signup' onClick="window.location='/signup.html';">Sign Up</button></div></header>`;
            content += `<table id='table1'><tr position='sticky'><th>Route Distance</th><th>Price</th></tr>`;
            content += `<tr><td>Multiplier</td><form action='/updatePrice' method='post'><td><input type='text' name='price' required placeholder='Multiplier'></td><td id='submittd'><input type='submit'></td></form></tr>`;
            for (r of rows) {
                content += `<tr><td>${r.routeDistance}</td><td>${r.price}</td></tr>`;
            }
            content += '</table>';
            response.send(content);
        }
    });
    connection.end();
});

app.post('/updatePrice', (request, response) => {
    let connection = establishConnection();
    connection.connect();
    connection.query(`
    SELECT routeDistance
    FROM EstimatedCost
    `, (err, rows, fields) => {
        if (err) {
            response.send(err);
        }
        else {
            let content = '';
            for (r of rows) {
                connection.query(`
                UPDATE EstimatedCost
                SET price = (${r.routeDistance * request.body.price})
                WHERE routeDistance = ${r.routeDistance};
                `, (err, rows, fields) => {
                    if (err) {
                        response.send('An error has occurred. Ensure you submit a valid number.');
                    }
                });
            }
            connection.end();
        }
        response.redirect('/adminPage.html');
    });
});

app.get('/discountedBookings', (request, response) => {
    let connection = establishConnection();
    connection.connect();
    connection.query(`
    SELECT bookingID, username, e.price, b.addedService, bk.promotionCode, p.discount, price - discount as discountedPrice
    FROM Booking bk, Bus b, Route r, EstimatedCost e, Promotion p
    WHERE bk.promotionCode IS NOT NULL
    AND bk.busNo = b.busNo
    AND b.routeID = r.routeID
    AND r.routeDistance = e.routeDistance
    AND bk.promotionCode = p.promotionCode
    ORDER BY bookingID;
    `, (err, rows, fields) => {
        if (err) {
            response.send('An error has occurred. Please ensure you are using a valid input.');
        }
        else {
            let content = `<link rel='stylesheet' href='template.css'><header id='webheader'><img id='weblogo' src='logo.png'><p id='webname'>SoftwareDrip</p><div id='weboption'><a id='optiontext3' href='/book.html'>Book a Bus</a><a id='optiontext2' href='/check.html'>Check Booking</a><a id='optiontext1' href='/admin.html'>Admin Login</a><button id='signup' onClick="window.location='/signup.html';">Sign Up</button></div></header>`;
            content += `<table id='table2'><tr><th>Booking ID</th><th>Username</th><th>Price</th><th>Added Service</th><th>Added Service Price</th><th>Total</th><th>PromotionCode</th><th>Discount</th><th>Discounted Price</th></tr>`;
            for (r of rows) {
                let extra = 0;
                content += `<tr><td>${r.bookingID}</td><td>${r.username}</td><td>${r.price}</td><td>${r.addedService}</td>`;
                if (r.addedService == 'WiFi') {
                    extra = 5;
                }
                else if (r.addedService == "Reclining") {
                    extra = 15;
                }
                else {
                    extra = 2;
                }
                let n = r.discountedPrice + extra;
                n = parseFloat(n.toFixed(2));
                content += `<td>${extra}</td><td>${r.price + extra}</td><td>${r.promotionCode}</td><td>${r.discount}</td><td>${n}</td></tr>`;
            }
            content += '</table>';
            response.send(content);
        }
    });
    connection.end();
});

app.get('/busDriver', (request, response) => {
    let connection = establishConnection();
    connection.connect();
    connection.query(`SELECT * FROM BusDriver`, (err, rows, fields) => {
        if (err) {
            response.send('An error has occurred. Please ensure you are using a valid input.');
        }
        else {
            let content = `<link rel='stylesheet' href='template.css'><header id='webheader'><img id='weblogo' src='logo.png'><p id='webname'>SoftwareDrip</p><div id='weboption'><a id='optiontext3' href='/book.html'>Book a Bus</a><a id='optiontext2' href='/check.html'>Check Booking</a><a id='optiontext1' href='/admin.html'>Admin Login</a><button id='signup' onClick="window.location='/signup.html';">Sign Up</button></div></header>`;
            content += `<table id='table3'><tr><th>Employee ID</th><th>First Name</th><th>Last Name</th></tr>`;
            content += `<tr><form action='/addBusDriver' method='post'><td></td><td><input type='text' name='firstName' placeholder='First Name' required></td><td><input type='text' name='lastName' placeholder='Last Name' required></td><td id='submittd'><input type='submit'></td></form></tr>`;
            for (r of rows) {
                content += `<tr><td>${r.employeeID}</td><td>${r.firstName}</td><td>${r.lastName}</td></tr>`;
            }
            content += '</table>';
            response.send(content);
        }
    });
    connection.end();
});

app.get('/unassignedDriver', (request, response) => {
    let connection = establishConnection();
    connection.connect();
    connection.query(`
    SELECT *
    FROM BusDriver d
    WHERE employeeID NOT IN (SELECT employeeID
                             FROM Bus b
                             WHERE d.employeeID = b.employeeID);
    `, (err, rows, fields) => {
        if (err) {
            response.send('An error has occurred. Please ensure you are using a valid input.');
        }
        else {
            let content = `<link rel='stylesheet' href='template.css'><header id='webheader'><img id='weblogo' src='logo.png'><p id='webname'>SoftwareDrip</p><div id='weboption'><a id='optiontext3' href='/book.html'>Book a Bus</a><a id='optiontext2' href='/check.html'>Check Booking</a><a id='optiontext1' href='/admin.html'>Admin Login</a><button id='signup' onClick="window.location='/signup.html';">Sign Up</button></div></header>`;
            content += `<table id='table4'><tr><th>Employee ID</th><th>First Name</th><th>Last Name</th></tr>`;
            for (r of rows) {
                content += `<tr><td>${r.employeeID}</td><td>${r.firstName}</td><td>${r.lastName}</td><td id='submittd'><button onClick=window.location='/unassignedBus/${r.employeeID}'>Assign</button></td></tr>`;
            }
            content += '</table>';
            response.send(content);
        }
    });
    connection.end();
});

app.get('/unassignedBus/:employeeID', (request, response) => {
    let connection = establishConnection();
    connection.connect();
    connection.query(`
    SELECT *
    FROM Bus
    WHERE employeeID IS NULL;
    `, (err, rows, fields) => {
        if (err) {
            response.send('An error has occurred. Please ensure you are using a valid input.');
        }
        else {
            let content = `<link rel='stylesheet' href='/css/param.css'><header id='webheader'><img id='weblogo' src='/css/paramlogo.png'><p id='webname'>SoftwareDrip</p><div id='weboption'><a id='optiontext3' href='/book.html'>Book a Bus</a><a id='optiontext2' href='/check.html'>Check Booking</a><a id='optiontext1' href='/admin.html'>Admin Login</a><button id='signup' onClick="window.location='/signup.html';">Sign Up</button></div></header>`;
            content += `<h3>Assigning Employee #${request.params.employeeID}</h3><table id='table8'><tr><th>Bus Number</th><th>Commission Date</th><th>Bus Model</th><th>addedService</th><th>routeID</th></tr>`;
            for (r of rows) {
            let commDate = new Date(r.commissionDate).toDateString();
                content += `<tr><td>${r.busNo}</td><td>${commDate}</td><td>${r.busModel}</td><td>${r.addedService}</td><td>${r.routeID}</td><td id='submittd'><button onClick=window.location='/assignDriver/${request.params.employeeID}/${r.busNo}'>Assign</button></td></tr>`;
            }
            content += '</table>';
            response.send(content);
        }
    });
    connection.end();
});

app.get('/assignDriver/:employeeID/:busNo', (request, response) => {
    let connection = establishConnection();
    connection.connect();
    connection.query(`
    UPDATE Bus b
    SET employeeID = ${request.params.employeeID}
    WHERE busNo = ${request.params.busNo}
    `, (err, rows, fields) => {
        if (err) {
            response.send('An error has occurred. Please try again.');
        }
        else {
            response.redirect('/bus');
        }
    });
    connection.end();
});

app.post('/addBusDriver', (request, response) => {
    let connection = establishConnection();
    connection.connect();
    connection.query(`
    INSERT INTO BusDriver (firstName, lastName)
    VALUES ('${request.body.firstName}', '${request.body.lastName}')
    `, (err, rows, fields) => {
        if (err) {
            response.send('An error has occurred. Please ensure you are inputting valid entries.');
        }
        else {
            response.redirect('/busDriver');
        }
    });
    connection.end();
});

app.get('/bus', (request, response) => {
    let connection = establishConnection();
    connection.connect();
    connection.query(`SELECT * FROM Bus`, (err, rows, fields) => {
        if (err) {
            response.send('An error has occurred. Please ensure you are using a valid input.');
        }
        else {
            let content = `<link rel='stylesheet' href='template.css'><header id='webheader'><img id='weblogo' src='logo.png'><p id='webname'>SoftwareDrip</p><div id='weboption'><a id='optiontext3' href='/book.html'>Book a Bus</a><a id='optiontext2' href='/check.html'>Check Booking</a><a id='optiontext1' href='/admin.html'>Admin Login</a><button id='signup' onClick="window.location='/signup.html';">Sign Up</button></div></header>`;
            content += `<form action='/addBus' method='post'><table><tr><th>Bus Number</th><th>Commission Date</th><th>Bus Model</th><th>Insurance ID</th><th>Tickets Available</th><th>Added Service</th><th>Employee ID</th><th>Route ID</th></tr>`;
            content += `<tr><td></td><td><input type='date' name='commissionDate'></td><td><input type='text' name='busModel' required placeholder='Bus Model'></td><td><input type='text' name='insuranceID' required placeholder='Insurance ID'></td><td><input type='text' name='ticketsAvailable' placeholder='Tickets Available'></td><td><input type='text' name='addedService' required placeholder='Added Service'></td><td><input type='text' name='employeeID' placeholder='Employee ID'></td><td><input type='text' name='routeID' placeholder='Route ID'></td><td id='submittd'><input type='submit'></td></tr>`;
            for (r of rows) {
                let commDate = new Date(r.commissionDate).toDateString();
                content += `<tr><td>${r.busNo}</td><td>${commDate}</td><td>${r.busModel}</td><td>${r.insuranceID}</td><td>${r.ticketsAvailable}</td><td>${r.addedService}</td><td>${r.employeeID}</td><td>${r.routeID}</td></tr>`;
            }
            content += '</table></form>';
            response.send(content);
        }
    });
    connection.end();
});

app.post('/addBus', (request, response) => {
    let connection = establishConnection();
    connection.connect();
    connection.query(`
    INSERT INTO Bus (commissionDate, busModel, insuranceID, ticketsAvailable, addedService, employeeID, routeID)
    VALUES ('${request.body.commissionDate}', '${request.body.busModel}', '${request.body.insuranceID}', ${request.body.ticketsAvailable}, '${request.body.addedService}', ${request.body.employeeID}, ${request.body.routeID})
    `, (err, rows, fields) => {
        if (err) {
            response.send('An error has occurred. Please ensure you input a model currently in use, and a unique insurance ID.');
        }
        else {
            response.redirect('/bus');
        }
    });
    connection.end();
});

app.get('/ticketsSold', (request, response) => {
    let content = `<link rel='stylesheet' href='template.css'><header id='webheader'><img id='weblogo' src='logo.png'><p id='webname'>SoftwareDrip</p><div id='weboption'><a id='optiontext3' href='/book.html'>Book a Bus</a><a id='optiontext2' href='/check.html'>Check Booking</a><a id='optiontext1' href='/admin.html'>Admin Login</a><button id='signup' onClick="window.location='/signup.html';">Sign Up</button></div></header>`;
    content += `<form action='/viewTicketsSold' method='post'><table id='table5'><tr><td id='submittd'>From</td><td id='submittd'>To</td></tr><tr><td id='submittd'><input type='date' name='startDate'><td id='submittd'><input type='date' name='endDate'></td><td id='submittd'><input type='submit'></td></tr></table></form>`;
    response.send(content);
});

app.post('/viewTicketsSold', (request, response) => {
    let connection = establishConnection();
    connection.connect();
    connection.query(`
    SELECT busNo, busModel, addedService, routeID,  COUNT(*) as numberOfBookings
    FROM Bus b 
    NATURAL JOIN Booking bk
    WHERE bookingDate >= '${request.body.startDate}'
    AND bookingDate <= '${request.body.endDate}'
    GROUP BY busNo
    ORDER BY numberOfBookings DESC;
    `, (err, rows, fields) => {
        if (err) {
            response.send('An error has occurred. Please ensure you are using a valid input.');
        }
        else {
            let content = `<link rel='stylesheet' href='template.css'><header id='webheader'><img id='weblogo' src='logo.png'><p id='webname'>SoftwareDrip</p><div id='weboption'><a id='optiontext3' href='/book.html'>Book a Bus</a><a id='optiontext2' href='/check.html'>Check Booking</a><a id='optiontext1' href='/admin.html'>Admin Login</a><button id='signup' onClick="window.location='/signup.html';">Sign Up</button></div></header>`;
            content += `<table id='table6'><tr><th>Bus Number</th><th>Bus Model</th><th>Added Service</th><th>Route ID</th><th>Number of Bookings</th></tr>`;
            for (r of rows) {
                content += `<tr><td>${r.busNo}</td><td>${r.busModel}</td><td>${r.addedService}</td><td>${r.routeID}</td><td>${r.numberOfBookings}</td></tr>`;
            }
            content += '</table>';
            response.send(content);
        }
    });
    connection.end();
});

app.get('/ticketsLeft', (request, response) => {
    let content = `<link rel='stylesheet' href='template.css'><header id='webheader'><img id='weblogo' src='logo.png'><p id='webname'>SoftwareDrip</p><div id='weboption'><a id='optiontext3' href='/book.html'>Book a Bus</a><a id='optiontext2' href='/check.html'>Check Booking</a><a id='optiontext1' href='/admin.html'>Admin Login</a><button id='signup' onClick="window.location='/signup.html';">Sign Up</button></div></header>`;
    content += `<form action='/viewTicketsLeft' method='post'><table id='table5'><tr><td id='submittd'>On</td></tr><tr><td id='submittd'><input type='date' name='date'><td id='submittd'><input type='submit'></td></tr></table></form>`;
    response.send(content);
});

app.post('/viewTicketsLeft', (request, response) => {
    let connection = establishConnection();
    connection.connect();
    connection.query(`
    SELECT bk.busNo, b.busModel, addedService, employeeID, routeID, busCapacity, COUNT(*) as numberOfBookings, busCapacity - COUNT(*) as ticketsLeft
    FROM Bus b
    INNER JOIN ModelCapacity m ON b.busModel = m.busModel
    INNER JOIN Booking bk ON b.busNo = bk.busNo
    WHERE bookingDate = '${request.body.date}'
    GROUP BY bk.busNo
    ORDER BY ticketsLeft;
    `, (err, rows, fields) => {
        if (err) {
            response.send('An error has occurred. Please ensure you are using a valid input.');
        }
        else {
            let content = `<link rel='stylesheet' href='template.css'><header id='webheader'><img id='weblogo' src='logo.png'><p id='webname'>SoftwareDrip</p><div id='weboption'><a id='optiontext3' href='/book.html'>Book a Bus</a><a id='optiontext2' href='/check.html'>Check Booking</a><a id='optiontext1' href='/admin.html'>Admin Login</a><button id='signup' onClick="window.location='/signup.html';">Sign Up</button></div></header>`;
            content += `<table id='table7'><tr><th>Bus Number</th><th>Bus Model</th><th>Added Service</th><th>Employee ID</th><th>Route ID</th><th>Bus Capacity</th><th>Number of Bookings</th><th>Tickets Left</th></tr>`;
            for (r of rows) {
                content += `<tr><td>${r.busNo}</td><td>${r.busModel}</td><td>${r.addedService}</td><td>${r.employeeID}</td><td>${r.routeID}</td><td>${r.busCapacity}</td><td>${r.numberOfBookings}</td><td>${r.ticketsLeft}</td></tr>`;
            }
            content += '</table>';
            response.send(content);
        }
    });
    connection.end();
});

app.get('/findCheapestBus', (request, response) => {
    let connection = establishConnection();
    connection.connect();
    connection.query(`
    SELECT DISTINCT dStationNo
    FROM Route;
    `, (err, rows, fields) => {
        if (err) {
            response.send('An error has occurred. Please ensure you are using a valid input.');
        }
        else {
            let content = `<link rel='stylesheet' href='template.css'><header id='webheader'><img id='weblogo' src='logo.png'><p id='webname'>SoftwareDrip</p><div id='weboption'><a id='optiontext3' href='/book.html'>Book a Bus</a><a id='optiontext2' href='/check.html'>Check Booking</a><a id='optiontext1' href='/admin.html'>Admin Login</a><button id='signup' onClick="window.location='/signup.html';">Sign Up</button></div></header>`;
            content += `<br><form action='/findCheapestBusRedirect' method='post'><table id='table10'><tr><td id='submittd'>Required Service</td><td id='submittd'>Station Number</td></tr><tr><td id='submittd'><select name='addedService'><option value='WiFi'>WiFi</option><option value='Legroom'>Legroom</option><option value='Reclining'>Reclining</option></td><td id='submittd'><select name='dStationNo'>`;
            for (r of rows) {
                content += `<option value='${r.dStationNo}'>${r.dStationNo}</option>`;
            }
            content += `</select></td><td id='submittd'><input type='submit'></td></table></form><table id='table9'><tr><th>Bus No</th><th>Added Service</th><th>Departure Station No</th><th>Arrival Station No</th><th>Departure Time</th><th>Route Distance</th><th>Price</th></tr>`;
            content += '</table>';
            response.send(content);
        }
    });
    connection.end();
});

app.post('/findCheapestBusRedirect', (request, response) => {
    response.redirect(`/findCheapestBus/${request.body.dStationNo}/${request.body.addedService}`);
});

app.get('/findCheapestBus/:dStationNo/:addedService', (request, response) => {
    let connection = establishConnection();
    connection.connect();
    connection.query(`
    SELECT busNo, addedService, dStationNo, aStationNo, departureTime, c.routeDistance, price
    FROM Bus b
    INNER JOIN Route r ON b.routeID = r.routeID
    INNER JOIN EstimatedCost c ON r.routeDistance = c.routeDistance
    WHERE addedService = '${request.params.addedService}'
    AND dStationNo = ${request.params.dStationNo}
    AND price = (SELECT MIN(price)
                 FROM Bus b
                 INNER JOIN Route r ON b.routeID = r.routeID
                 INNER JOIN EstimatedCost c ON r.routeDistance = c.routeDistance
                 WHERE addedService = '${request.params.addedService}'
                 AND dStationNo = ${request.params.dStationNo});
    `, (err, rows, fields) => {
        if (err) {
            response.send('An error has occurred. Please ensure you are using a valid input.');
        }
        else {
            let content = `<link rel='stylesheet' href='/css/param.css'><header id='webheader'><img id='weblogo' src='/css/paramlogo.png'><p id='webname'>SoftwareDrip</p><div id='weboption'><a id='optiontext3' href='/book.html'>Book a Bus</a><a id='optiontext2' href='/check.html'>Check Booking</a><a id='optiontext1' href='/admin.html'>Admin Login</a><button id='signup' onClick="window.location='/signup.html';">Sign Up</button></div></header>`;
            content += `<table id='table10'><tr><th>Bus No</th><th>Added Service</th><th>Departure Station No</th><th>Arrival Station No</th><th>Departure Time</th><th>Route Distance</th><th>Price</th></tr>`;
            for (r of rows) {
                content += `<tr><td>${r.busNo}</td><td>${r.addedService}</td><td>${r.dStationNo}</td><td>${r.aStationNo}</td><td>${r.departureTime}</td><td>${r.routeDistance}</td><td>${r.price}</td><td id='submittd'><button onClick=window.location='/${r.busNo}'>Book</button></td></tr>`;
            }
            content += '</table>';
            response.send(content);
        }
    });
    connection.end();
});

app.get('/stationLookup', (request, response) => {
    let content = `<link rel='stylesheet' href='/css/param.css'><header id='webheader'><img id='weblogo' src='/css/paramlogo.png'><p id='webname'>SoftwareDrip</p><div id='weboption'><a id='optiontext3' href='/book.html'>Book a Bus</a><a id='optiontext2' href='/check.html'>Check Booking</a><a id='optiontext1' href='/admin.html'>Admin Login</a><button id='signup' onClick="window.location='/signup.html';">Sign Up</button></div></header>`;
    content += `<form action='/stationLookupRedirect' method='post'><table id='table11'><tr><td id='submittd'>Keyword: </td><td id='submittd'><input type='text' name='keyword' required placeholder='Search a street nearby...'></td><td id='submittd'><input type='submit'></td></tr></table></form>`;
    response.send(content);
});

app.post('/stationLookupRedirect', (request, response) => {
    response.redirect(`/stationLookup/${request.body.keyword}`);
});

app.get('/stationLookup/:keyword', (request, response) => {
    let connection = establishConnection();
    connection.connect();
    connection.query(`
    SELECT busNo, addedService, routeDistance, departureTime, sd.stationNo, sd.stationAddress as departureAddress, sa.stationAddress as arrivalAddress
    FROM Bus b
    INNER JOIN Route r ON b.routeID = r.routeID
    INNER JOIN Station sd ON r.dStationNo = sd.stationNo
    INNER JOIN Station sa ON r.aStationNo = sa.stationNo
    WHERE dStationNo = (SELECT stationNo
                        FROM Station
                        WHERE stationAddress LIKE '%${request.params.keyword}%');
    `, (err, rows, fields) => {
        if (err) {
            response.send('An error has occurred. Please ensure you are using a valid input.');
        }
        else {
            let content = `<link rel='stylesheet' href='/css/param.css'><header id='webheader'><img id='weblogo' src='/css/paramlogo.png'><p id='webname'>SoftwareDrip</p><div id='weboption'><a id='optiontext3' href='/book.html'>Book a Bus</a><a id='optiontext2' href='/check.html'>Check Booking</a><a id='optiontext1' href='/admin.html'>Admin Login</a><button id='signup' onClick="window.location='/signup.html';">Sign Up</button></div></header>`;
            content += `<form action='/stationLookupRedirect' method='post'><table id='table11'><tr><td id='submittd'>Keyword: </td><td id='submittd'><input type='text' name='keyword' required placeholder='Search a street nearby...'></td><td id='submittd'><input type='submit'></td></tr></table></form>`;
            content += `<table id='table12'><tr><th>Bus Number</th><th>Added Service</th><th>Route Distance</th><th>Departure Time</th><th>Departure Station No</th><th>Departure Station Address</th><th>Arrival Station Address</th></tr>`;
            for (r of rows) {
                content += `<tr><td>${r.busNo}</td><td>${r.addedService}</td><td>${r.routeDistance}</td><td>${r.departureTime}</td><td>${r.stationNo}</td><td>${r.departureAddress}</td><td>${r.arrivalAddress}</td><td id='submittd'><button onClick=window.location='/${r.busNo}'>Book</button></td></tr>`;
            }
            content += '</table>';
            response.send(content);
        }
    });
    connection.end();
});

app.get('/:busNo', (request, response) => {
    let content = `<link rel='stylesheet' href='/css/param.css'><header id='webheader'><img id='weblogo' src='/css/paramlogo.png'><p id='webname'>SoftwareDrip</p><div id='weboption'><a id='optiontext3' href='/book.html'>Book a Bus</a><a id='optiontext2' href='/check.html'>Check Booking</a><a id='optiontext1' href='/admin.html'>Admin Login</a><button id='signup' onClick="window.location='/signup.html';">Sign Up</button></div></header>`;
    content += `<form action='/${request.params.busNo}/verifyLogin' method='post'><table id='table13'><tr><td id='submittd'>Username:</td><td id='submittd'><input type='text' name='uinput' required placeholder='Username'><br></td></tr><tr><td id='submittd'>Password:</td><td id='submittd'><input type='password' name='pinput' required placeholder='Password'><br></td></tr></table><input id='loginbutton' type='submit' value='Login'></form>`;
    response.send(content);
});

app.post('/:busNo/verifyLogin', (request, response) => {
    let connection = establishConnection();
    connection.connect();
    connection.query(`
    SELECT *
    FROM Customer
    WHERE username = '${request.body.uinput}'
    AND pswrd = '${request.body.pinput}'
    `, (err, rows, fields) => {
        if (err) {
            response.send('An error has occurred. Please ensure you are using a valid input.');
        }
        else if (rows.length == 1) {
            response.redirect(`/${request.body.uinput}/${request.params.busNo}`);
        }
        else {
            response.send('Incorrect Login!');
        }
    });
    connection.end();
});

app.get('/:username/:busNo', (request, response) => {
    let connection = establishConnection();
    connection.connect();
    connection.query(`
    SELECT busNo, addedService, sd.stationAddress as departureStation, sa.stationAddress as arrivalStation, r.routeDistance, r.departureTime, arrivalTime, price
    FROM Bus b, Route r, EstimatedCost c, EstimatedTime t, Station sd, Station sa
    WHERE b.routeID = r.routeID
    AND r.routeDistance = c.routeDistance
    AND r.routeDistance = t.routeDistance
    AND r.dStationNo = sd.stationNo
    AND r.aStationNo = sa.stationNo
    AND busNo = ${request.params.busNo};
    `, (err, rows, fields) => {
        if (err) {
            response.send('An error has occurred. Please ensure you are using a valid input.');
        }
        else {
            let content = `<link rel='stylesheet' href='/css/param.css'><header id='webheader'><img id='weblogo' src='/css/paramlogo.png'><p id='webname'>SoftwareDrip</p><div id='weboption'><a id='optiontext3' href='/book.html'>Book a Bus</a><a id='optiontext2' href='/check.html'>Check Booking</a><a id='optiontext1' href='/admin.html'>Admin Login</a><button id='signup' onClick="window.location='/signup.html';">Sign Up</button></div></header>`;
            content += `<table id='table14'><tr><th>Added Service</th><th>Departure Station</th><th>Arrival Station</th><th>Route Distance</th><th>Departure Time</th><th>Arrival Time</th><th>Base Price</th></tr>`;
            for (r of rows) {
                content += `<tr><td>${r.addedService}</td><td>${r.departureStation}</td><td>${r.arrivalStation}</td><td>${r.routeDistance}</td><td>${r.departureTime}</td><td>${r.arrivalTime}</td><td>${r.price}</td></tr></table>`;
            }
            let date = new Date();
            today = date.toISOString().split('T')[0]
            content += `<form action='/confirmBooking' method='post'><table id='table15'><tr><td id='submittd'>Username</td><td id='submittd'>Bus Number</td><td id='submittd'>Payment Method</td><td id='submittd'>Booking Date</td><td id='submittd'>Promotion Code</td></tr><tr><td id='submittd'><input type='text' name='username' value='${request.params.username}' readonly></td><td id='submittd'><input type='text' name='busNo' value='${request.params.busNo}' readonly></td><td id='submittd'><select name='paymentMethod'><option>mastercard</option><option>americanexpress</option></select></td><td id='submittd'><input type='date' min='${today}' name='bookingDate' required></td><td id='submittd'><input type='text' name='promotionCode' placeholder='Promotion Code'></td><td id='submittd'><input type='submit'></td></tr></table></form>`;
            response.send(content);
        }
    });
    connection.end();
});

app.post('/confirmBooking', (request, response) => {
    let connection = establishConnection();
    connection.connect();
    connection.query(`
    INSERT INTO Booking (paymentMethod, bookingDate, busNo, promotionCode, username)
    VALUES ('${request.body.paymentMethod}', '${request.body.bookingDate}', ${request.body.busNo}, '${request.body.promotionCode}', '${request.body.username}');
    `, (err, rows, fields) => {
        if (err) {
            response.send('An error has occurred. Please ensure you are using a valid input.');
        }
        else {
            response.redirect('/book.html');
        }
    });
    connection.end();
});

app.post('/checkLogin', (request, response) => {
    let connection = establishConnection();
    connection.connect();
    connection.query(`
    SELECT *
    FROM Customer
    WHERE username = '${request.body.uinput}'
    AND pswrd = '${request.body.pinput}'
    `, (err, rows, fields) => {
        if (err) {
            response.send('An error has occurred. Please ensure you are using a valid input.');
        }
        else if (rows.length == 1) {
            response.redirect(`/getBooking/${request.body.uinput}`);
        }
        else {
            response.send('Incorrect Login!');
        }
    });
    connection.end();
});

app.post('/search', (request, response) => {
    let connection = establishConnection();
    connection.connect();
    connection.query(`
    SELECT busNo, sd.stationNo, sd.stationAddress as departureAddress, sa.stationAddress as arrivalAddress, addedService, r.departureTime, e.arrivalTime
    FROM Bus b
    INNER JOIN Route r ON b.routeID = r.routeID
    INNER JOIN EstimatedTime e ON r.routeDistance = e.routeDistance
    INNER JOIN Station sd ON r.dStationNo = sd.stationNo
    INNER JOIN Station sa ON r.aStationNo = sa.stationNo
    WHERE sd.stationAddress LIKE '%${request.body.key1}%'
    AND sa.stationAddress LIKE '%${request.body.key2}%';
    `, (err, rows, fields) => {
        if (err) {
            response.send('An error has occurred. Please ensure you are using a valid input.');
        }
        else {
            let content = `<link rel='stylesheet' href='/css/param.css'><header id='webheader'><img id='weblogo' src='/css/paramlogo.png'><p id='webname'>SoftwareDrip</p><div id='weboption'><a id='optiontext3' href='/book.html'>Book a Bus</a><a id='optiontext2' href='/check.html'>Check Booking</a><a id='optiontext1' href='/admin.html'>Admin Login</a><button id='signup' onClick="window.location='/signup.html';">Sign Up</button></div></header>`;
            content += `<table id='table16'><tr><th>Bus Number</th><th>Departure Station #</th><th>Departure Address</th><th>Arrival Address</th><th>Added Service</th><th>Departure Time</th><th>Arrival Time</th></tr>`;
            for (r of rows) {
                content += `<tr><td>${r.busNo}</td><td>${r.stationNo}</td><td>${r.departureAddress}</td><td>${r.arrivalAddress}</td><td>${r.addedService}</td><td>${r.departureTime}</td><td>${r.arrivalTime}</td><td id='submittd'><button onClick=window.location='/${r.busNo}'>Book</button></td></tr>`;
            }
            content += '</table>';
            response.send(content);
        }
    });
    connection.end();
});

/*
app.get('/template', (request, response) => {
    let connection = establishConnection();
    connection.connect();
    connection.query(`SELECT * FROM Table`, (err, rows, fields) => {
        if (err) {
            response.send(err);
        }
        else {
            let content = '';
            for (r of rows) {
                content += ``;
            }
            content += '';
            response.send(content);
        }
    });
    connection.end();
});
*/
app.listen(80);