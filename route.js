const express = require('express');
const router = express.Router();
const database = require('./database');
const nodemailer = require('nodemailer');

router.post('/enroll',(req, res) => {
    try {
        var name = req.body.name;
        var mobile = req.body.mobile;
        var email = req.body.email;
        var city = req.body.city;
        var state = req.body.state;
        database.connection.getConnection((err, connection) => {
            if (err) {
                if (connection) {
                    connection.release();
                    connection, destroy();
                }
                res.status(500).json({
                    status: false,
                    message: err.message
                });
            }
            var insertQuery = `insert into customer(name,mobile,email,city,state) VALUES('${name}','${mobile}','${email}','${city}','${state}');`
            connection.query(insertQuery, (error, rows, fields) => {
                console.log("query ", insertQuery)
                if (error) {
                    if (connection) {
                        connection.release();
                        connection.destroy();
                    }
                    if (error.code == 'ER_DUP_ENTRY') {
                        resObj = {
                            status: false,
                            message: "User already exists."
                        }
                        return res.status(200).json(resObj);
                    }
                    return res.status(500).json({
                        status: false,
                        message: error.message
                    });
                }
                const result = {
                    status: true,
                    message: "applyed Successfully.",
                    response: req.body
                }
                if (connection) {
                    connection.release();
                    connection.destroy();
                }

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'qtower8787@gmail.com',
                      pass: 'Mahi@8796'
                    }
                });
                  
                var mailOptions = {
                    from: 'qtower8787@gmail.com',
                    to: 'qtower8796@gmail.com',
                    subject: 'email from application',
                    text: " name : " + name + "\n " +  "mobile : " + mobile + "\n " + "email : " + email + "\n " + "city : "+ city + "\n " + "state : " + state
                };
                  
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                });
                return res.status(200).json(result);
            });
        });
    } catch(e) {
        console.log(e);
        return res.status(500).json({
            status: false,
            message: e.message
        });
    }
});

module.exports = router;
