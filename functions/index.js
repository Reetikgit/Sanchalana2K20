const functions = require('firebase-functions');

const admin = require("firebase-admin")

const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
   
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://<contactform-673b7>.firebaseio.com'
});
 

//google account credentials used to send email

var transporter = nodemailer.createTransport({
   
    host: 'smtp.gmail.com',
    port: 465,
    secure:true,
    auth: {
      
        user: 'reetikchitragupt@gmail.com',
        pass: 'mygmail7355670645'
    },
     tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  }
});
exports.sendEmail = functions.database.ref('/SoloSinging/{pushID}')
    .onWrite(async (change) => {
         const snapshot = change.after;
  const val = snapshot.val();

  const mailOptions = {
    from: '"Reetik " <reetikchitragupt@gmail.com>',
    to: val.email,
  };

  // Building Email message.
  mailOptions.subject = 'Sanchalana 2k20 ';
 //for example
  mailOptions.text = 'Welcome '+val.usn+' '+'Your registration has been confirmed'+ ' Your unique Id is'+''+ val.random;

  try {
    console.log(val.email);
    await transporter.sendMail(mailOptions);
    console.log('email sent to:', val.email);
    transporter.close();
    console.log(val.email)
  } catch(error) {
    console.error('There was an error while sending the email:'+val.email, error);
  }
  return null;
});


// List all resources, max 20 at a time
//     exports.sendMSg = functions.database.ref('/Signup/{pushID}')
//     .onWrite(async (change) => {
//     (function main() {
//     'use strict';
//     var client = new plivo.Client("MAMMEZZMM3ODFIMGEWOW", "MGFiZDFjMjU2M2NmNmU1ZmVkMzBiYWY0OWI3MzZk");
//     client.messages.create(
//         null, //from
//         "+917355670645", // to
//         "Hello, this is a sample text from Plivo", // text
//         {
//             method: "GET",
//             url: "http://foo.com/sms_status/"
//         },
//         "your_powerpack_uuid" //powerpack_uuid

//     ).then(function (response) {
//         console.log(response);
//         //Prints only the message_uuid
//         console.log(response.messageUuid);
//     }, );
// })();
// });
//     const plivo = require('plivo').RestAPI({
//   authId: '<>',
//   authToken: '<>',  
// });
// exports.sendmsg = functions.database.ref('/Signup/{pushID}')
//     .onWrite(async (change) => {


// function getParmas(phone, otp) {
//   return {
//     'src': 'xx-xxxx',
//     'dst' : '91'+ 7355670645,
//     'text' : "Your OTP for verification is " + otp,
//     'url' : "https://intense-brook-8241.herokuapp.com/report/",
//     'method' : "GET"
//   }
// }

// function sendOTP(phone) {
//   var otp;
//   // Generate your OTP here
  
//   plivo.make_call(getParmas(phone, otp), function(status, response) {
//     console.log('Status:' + status)
//     console.log('Reponse:' + response)
//   })
// }

// sendOTP('7355670645');

//  });
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
