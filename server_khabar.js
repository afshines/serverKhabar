const express = require('express')
const axios = require('axios')
const bodyParser = require("body-parser");
var mongoose = require("mongoose");
const app = express()
const port = 8989;
const JWT = require("jsonwebtoken");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const StrategyJwt = passportJWT.Strategy;
const Users = require("./models/user").Users;
const History = require("./models/history").History;
const passport_admin = require("passport");
const secretOrKey = "UkXp2s5v8y/B?E(H+MbQeThVmY)J@NcRfUjXnZr4u7x!A";
const farsiChars = [
    ".",
    "آ",
    "ا",
    "ب",
    "پ",
    "ت",
    "ث",
    "ج",
    "چ",
    "ح",
    "خ",
    "د",
    "ذ",
    "ر",
    "ز",
    "ژ",
    "س",
    "ش",
    "ص",
    "ض",
    "ط",
    "ظ",
    "ع",
    "غ",
    "ف",
    "ق",
    "ک",
    "گ",
    "ل",
    "م",
    "ن",
    "و",
    "ه",
    "ی",
];



passport.use(
    "admin-rule",
    new StrategyJwt(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: secretOrKey,
        },
        function (jwtPayload, done) {
            return Users.findById(jwtPayload.id)
                .then((user) => {
                    if (user.roles.includes("admin")) return done(null, user);
                    else return done(null, false, { message: "Incorrect Admin." });
                })
                .catch((eer) => {
                    return done(eer);
                });
        }
    )
);

passport.use(
    "operator-rule",
    new StrategyJwt(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: secretOrKey,
        },
        function (jwtPayload, done) {
            return Users.findById(jwtPayload.id)
                .then((user) => {
                    if (user.roles.includes("operator") || user.roles.includes("admin")) return done(null, user);
                    else return done(null, false, { message: "Incorrect user." });
                })
                .catch((eer) => {
                    return done(eer);
                });
        }
    )
);

const cors = require('cors');
app.use(cors({
    origin: '*'
}));

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

var mongoDB = "mongodb://afshin:dfd232FGG&&875fdSS@localhost:27017/khabaronline?authSource=admin";

//var mongoDB = "mongodb://localhost:27017/khabaronline";

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });


//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
//db.on("error", console.error.bind(console, "MongoDB connection error:"));

const TAPSELL = "tapsell";
const INTERNAL = "internal";
const YEKTANET = "yektanet";

const TOPIC_IDS = [


    {
        id: 1,
        name: "سیاست",
        box_id: 409
    },
    {
        id: 2,
        name: "اقتصاد",
        box_id: 410
    },
    {
        id: 3,
        name: "فرهنگ",
        box_id: 412
    },
    {
        id: 4,
        name: "جامعه",
        box_id: 413
    },
    {
        id: 5,
        name: "بین الملل",
        box_id: 409
    },
    {
        id: 6,
        name: "ورزش",
        box_id: 408
    },
    {

        id: 7,
        name: "دانش و فناوری",
        box_id: 414

    },
    {

        id: 10,
        name: "چندرسانه ای",
        box_id: 415

    },
];

app.get('/test', (req, res) => {

    /// console.log(req.query.data);
    return req.query.data;

});


app.get('/getTopicBox/:id', (req, res) => {

    let box_id = 409;//default
    let list = TOPIC_IDS.filter(i => i.id == req.params.id);
    if (list.length > 0)
        return list[0].box_id
    else
        return box_id

});


app.get('/advertisements', (req, res) => {

    res.json({

        home1:[
            {
                type: YEKTANET,
                id: 'b335131a-85fd-42d7-ba47-1c489487020d',
                name: 'استیکی لیست خبر',
                place: 'sticky',
            },
                
            {
                type: YEKTANET,
                id: 'ce712000-6d58-488e-a7fc-cd84e4d6f27b',
                name: 'همسان بزرگ تکرار شونده لیست اول',
                place: 'list1',
            },
            {
                type: YEKTANET,
                id: '55c910f1-78a0-478c-85ad-0f7b2a953fb8',
                name: '1همسان بنری بین لیست خبر',
                place: 'list2',
            },

            {
                type: YEKTANET,
                id: 'fac9f55b-1857-456e-88ce-34b7056c0813',
                name: 'همسان بزرگ تکرار شونده لیست دوم',
                place: 'list3',
            },

            {
                type: YEKTANET,
                id: 'cddf8106-dca5-4ec0-a43d-ec90573dc19c',
                name: '2همسان بنری بین لیست خبر',
                place: 'list4',
            },

        ],
        home: [
            // {
            //     //  type: TAPSELL,
            //     // id:'6404ca0eb96efa3785450619',
            //     name: 'استیکی لیست خبر',
            //     place: 'sticky',

            //     type: INTERNAL,

            //     title: 'تست',
            //     callbackurl: 'http://hascoweb.com/wp-content/uploads/2021/03/logo-03.png',
            //     responseId: '567567567567',
            //     landscapeImageUrl: 'http://hascoweb.com/wp-content/uploads/2021/03/logo-03.png',
            //     description: 'تست تست تست ',
            //     callToActionText: 'تست',
            //     iconUrl: 'http://hascoweb.com/wp-content/uploads/2021/03/logo-03.png',

            // },
            {
                type: TAPSELL,
                id: '6404ca0eb96efa3785450619',
                name: 'استیکی لیست خبر',
                place: 'sticky',
            },
            
           
// {
//             type: INTERNAL,
//             id: 'cue445',
//               name: 'استیکی لیست خبر',
//                 place: 'sticky',


//                     title: 'BNPL',
//            callbackurl: 'https://mybajet.ir/images/bnpl-1.png',
//            responseId: '567567567567',
//           landscapeImageUrl: 'https://mybajet.ir/images/bnpl-1.png',
//            description: 'الان خرید کن، بعدا پرداخت کن!',
//             callToActionText: 'خرید',
//           iconUrl: 'https://mybajet.ir/images/bnpl-1.png',
//         },
            {
                type: TAPSELL,
                id: '6404ca7c6f61060ce6dfc3dc',
                name: 'همسان بزرگ تکرار شونده لیست اول',
                place: 'list1',
            },
            {
                type: TAPSELL,
                id: '640ccebcbd020942896e73bd',
                name: '1همسان بنری بین لیست خبر',
                place: 'list2',
            },

            {
                type: TAPSELL,
                id: '640de8d0972aed14bd5e32e9',
                name: 'همسان بزرگ تکرار شونده لیست دوم',
                place: 'list3',
            },

            {
                type: TAPSELL,
                id: '640de905bd020942896e73d6',
                name: '2همسان بنری بین لیست خبر',
                place: 'list4',
            },

        ],
        home_ios: [
       
            // {
            //     type: INTERNAL,
            //     id: 'cue445',
            //     name: 'همسان بزرگ تکرار شونده لیست اول',
            //     place: 'list1',
            //     title: 'BNPL',
            //     callbackurl: 'https://mybajet.ir/images/bnpl-1.png',
            //     responseId: '567567567567',
            //     landscapeImageUrl: 'https://mybajet.ir/images/bnpl-1.png',
            //     description: 'الان خرید کن، بعدا پرداخت کن!',
            //     callToActionText: 'خرید',
            //     iconUrl: 'https://mybajet.ir/images/bnpl-1.png',
                
            // },
        ],
        news1:[
            {
                type: YEKTANET,
                id: 'ee72a440-b5ee-47e6-9651-5e25975da491',
                name: 'استیکی تک خبر',
                place: 'sticky_news',
            },
            {
                type: YEKTANET,
                id: 'c8cb7e6d-ff69-437b-9811-9ea59aceb86f',
                name: 'همسان بزرگ داخل خبر',
                place: 'news',
            },


            {
                type: YEKTANET,
                id: 'd8bd0302-436c-4f37-b78b-07178e4a71b2',
                name: 'همسان بنری بین متن خبر یک',
                place: 'news_between_1',
            },
            {
                type: YEKTANET,
                id: '6452e7e5-a410-4439-b413-4fb2ddb81579',
                name: 'همسان بنری بین متن خبر دو',
                place: 'news_between_2',
            },


            {
                type: YEKTANET,
                id: 'a468b860-128e-4067-a2a1-088de2ae21e0',
                name: 'همسان بنری انتها خبر یک',
                place: 'news_after_1',
            },
          
        ],
        news: [

            //  {
            //     type: INTERNAL,
            //     id: 'cue445',
            //     name: 'همسان بزرگ تکرار شونده لیست اول',
            //     place: 'list1_test',


            //             title: 'BNPL',
            //    callbackurl: 'https://mybajet.ir/images/bnpl-1.png',
            //    responseId: '567567567567',
            //   landscapeImageUrl: 'https://mybajet.ir/images/bnpl-1.png',
            //    description: 'الان خرید کن، بعدا پرداخت کن!',
            //     callToActionText: 'خرید',
            //   iconUrl: 'https://mybajet.ir/images/bnpl-1.png',
            // },


            {
                type: TAPSELL,
                id: '6404ca2b6f61060ce6dfc3db',
                name: 'استیکی تک خبر',
                place: 'sticky_news',
            },
            {
                type: TAPSELL,
                id: '6404cad36064633dec09498e',
                name: 'همسان بزرگ داخل خبر',
                place: 'news',
            },


            {
                type: TAPSELL,
                id: '6404cb118ecf8f47a73321f5',
                name: 'همسان بنری بین متن خبر یک',
                place: 'news_between_1',
            },
            {
                type: TAPSELL,
                id: '6404cb218ecf8f47a73321f6',
                name: 'همسان بنری بین متن خبر دو',
                place: 'news_between_2',
            },


            {
                type: TAPSELL,
                id: '6404cb3f311e6c3912b759c7',
                name: 'همسان بنری انتها خبر یک',
                place: 'news_after_1',
            },
            // {
            //     type: TAPSELL,
            //     id: '6404cb4db96efa378545061a',
            //     name: 'همسان بنری انتها خبر دو',
            //     place: 'news_after_2',
            // },
            // {
            //     type: TAPSELL,
            //     id: '6404cb5c6064633dec094990',
            //     name: 'همسان بنری انتها خبر سه',
            //     place: 'news_after_3',
            // },

            // {
            //     type: INTERNAL,

            //     title:'',
            //     responseId:'',
            //     landscapeImageUrl:'',
            //     description:'',
            //     callToActionText:'',
            //     iconUrl:'',

            //     place:'news_after_3',
            // }
        ],
        news_ios: [

           
           
        ]
    });

});
app.get('/advertisements/web', (req, res) => {

    res.json({
        home: [

            {
                type: YEKTANET,
                id: 'class="yn-bnr stick-pos" id="ynpos-14291"',
                name: 'استیکی لیست خبر',
                place: 'sticky',
            },
            // {
            //     type: INTERNAL,
               
            //     name: 'همسان بزرگ داخل خبر',
            //     place: 'list1',


            //     id: 'cue445',
      


            //              title: 'BNPL',
            //     callbackurl: 'https://google.com',
            //     responseId: '567567567567',
            //    landscapeImageUrl: 'https://mybajet.ir/images/bnpl-1.png',
            //     description: 'الان خرید کن، بعدا پرداخت کن!',
            //      callToActionText: 'خرید',
            //    iconUrl: 'https://mybajet.ir/images/bnpl-1.png',
            // },

            //  {
            //     type: INTERNAL,
               
            //     name: 'همسان بزرگ داخل خبر',
            //     place: 'list2',


            //     id: 'cue445',
      


            //              title: 'BNPL',
            //     callbackurl: 'https://google.com',
            //     responseId: '567567567567',
            //    landscapeImageUrl: 'https://mybajet.ir/images/bnpl-1.png',
            //     description: 'الان خرید کن، بعدا پرداخت کن!',
            //      callToActionText: 'خرید',
            //    iconUrl: 'https://mybajet.ir/images/bnpl-1.png',
            // },

            // {
            //     type: INTERNAL,
               
            //     name: 'همسان بزرگ داخل خبر',
            //     place: 'list3',


            //     id: 'cue445',
      


            //              title: 'BNPL',
            //     callbackurl: 'https://google.com',
            //     responseId: '567567567567',
            //    landscapeImageUrl: 'https://mybajet.ir/images/bnpl-1.png',
            //     description: 'الان خرید کن، بعدا پرداخت کن!',
            //      callToActionText: 'خرید',
            //    iconUrl: 'https://mybajet.ir/images/bnpl-1.png',
            // },

            // {
            //     type: INTERNAL,
               
            //     name: 'همسان بزرگ داخل خبر',
            //     place: 'list4',


            //     id: 'cue445',
      


            //              title: 'BNPL',
            //     callbackurl: 'https://google.com',
            //     responseId: '567567567567',
            //    landscapeImageUrl: 'https://mybajet.ir/images/bnpl-1.png',
            //     description: 'الان خرید کن، بعدا پرداخت کن!',
            //      callToActionText: 'خرید',
            //    iconUrl: 'https://mybajet.ir/images/bnpl-1.png',
            // },

            {
                type: YEKTANET,
                id: 'id="pos-article-display-card-82135"',
                name: 'همسان بزرگ تکرار شونده لیست اول',
                place: 'list1',
            },
            {
                type: YEKTANET,
                id: 'class="yn-bnr" id="ynpos-14290"',
                name: '1همسان بنری بین لیست خبر',
                place: 'list2',
            },

            {
                type: YEKTANET,
                id: 'id="pos-article-display-card-82135"',
                name: 'همسان بزرگ تکرار شونده لیست دوم',
                place: 'list3',
            },

            {
                type: YEKTANET,
                id: 'class="yn-bnr" id="ynpos-14290"',
                name: '2همسان بنری بین لیست خبر',
                place: 'list4',
            },

        ],
        news: [
             {
                 type: YEKTANET,
                 id: 'class="yn-bnr stick-pos" id="ynpos-14291"',
                 name: 'استیکی تک خبر',
                 place: 'sticky_news',
             },
            {
                type: YEKTANET,
                id: 'id="pos-article-display-card-82135"',
                name: 'همسان بزرگ داخل خبر',
                place: 'news',
            },
            {
                type: YEKTANET,
                id: 'class="yn-bnr" id="ynpos-14290"',
                name: 'همسان بنری بین متن خبر یک',
                place: 'news_between_1',
            },
            {
                type: YEKTANET,
                id: 'class="yn-bnr" id="ynpos-14290"',
                name: 'همسان بنری بین متن خبر دو',
                place: 'news_between_2',
            },
            {
                type: YEKTANET,
                id: 'class="yn-bnr" id="ynpos-14290"',
                name: 'همسان بنری انتها خبر یک',
                place: 'news_after_1',
            },

        ]
    });

});
app.get('/getTopics', (req, res) => {

    res.json({
        status: true, data: [

            {
                topic: null,
                id: 4,
                name: "آخرین اخبار",


            },
            {
                topic: false,
                id: 406,
                name: "پربازدیدها",

            },
            {
                topic: false,
                id: 399,
                name: "اخبار داغ",

            },
            {
                topic: true,
                id: 82,
                name: "ویدئو ها",

            },



            {
                id: 1,
                name: "سیاست",
                topic: true,
            },
            {
                id: 2,
                name: "اقتصاد",
                topic: true,
            },
            {
                id: 3,
                name: "فرهنگ",
                topic: true,
            },
            {
                id: 4,
                name: "جامعه",
                topic: true,
            },
            {
                id: 5,
                name: "بین الملل",
                topic: true,
            },
            {
                id: 6,
                name: "ورزش",
                topic: true,
            },
            {
                topic: true,
                id: 7,
                name: "دانش و فناوری",

            },
            {
                topic: true,
                id: 10,
                name: "چندرسانه ای",

            },



        ]

    });

});


app.get('/getNews', (req, res) => {
    var url = 'https://www.khabaronline.ir/api?' + ((req.query.type != null && req.query.type != 'null') ? (req.query.type + '=' + req.query.topic + '&') : '') + 'size=' + req.query.size + ((req.query.from != undefined && req.query.from != null) ? '&from=' + req.query.from : '');

    // console.log(url);

    axios({
        method: 'get',
        url: url,
        responseType: 'application/json'
    })
        .then(function (response) {

            res.json({ status: true, data: response.data });
        })
        .catch(function (e) {

            res.json({ status: false, data: e });
        });


})

app.get('/getBoxNews/:box/:topic', (req, res) => {
    var url = 'https://www.khabaronline.ir/api?' + 'place=' + req.params.box + '&topic=' + req.params.topic + '&size=' + req.query.size + ((req.query.from != undefined && req.query.from != null) ? '&from=' + req.query.from : '');

    // console.log(url);

    axios({
        method: 'get',
        url: url,
        responseType: 'application/json'
    })
        .then(function (response) {

            res.json({ status: true, data: response.data });

        })
        .catch(function (e) {

            res.json({ status: false, data: e });
        });


});



app.get('/getOneNews/:id', (req, res) => {
    var url = 'https://www.khabaronline.ir/api?news=' + req.params.id + '&comment=1&related=1';

    axios({
        method: 'get',
        url: url,
        responseType: 'application/json'
    })
        .then(function (response) {


            var data = JSON.parse(response.data);
            var html = data.newsList[0].bodyHtml;

            let finalIndex = -1;
            farsiChars.forEach(_char => {
                let position = html.lastIndexOf(_char);
                if (position > finalIndex) finalIndex = position;
            });


            if (finalIndex != -1) {
                data.newsList[0].bodyHtml = html.slice(0, finalIndex + 1);
            } else {
                data.newsList[0].bodyHtml = '';
            }

            res.json({ status: true, data: JSON.stringify(data) });

        })
        .catch(function (e) {

            res.json({ status: false, data: e });
        });


})
app.get('/', (req, res) => {
    res.send({ title: 'Khabar Online' });
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

app.get('/getBox/:id/', (req, res) => {

    let _id = '63c64f3a4facd90f6f1149d2'
    if (req.params.id == 'khabar')
        _id = '63c64f3a4facd90f6f1149d2'

    var url = 'https://ads.pooye-ads.com?id=' + _id;


    return axios({
        method: 'get',
        url: url,
        responseType: 'application/json'
    })
        .then(async function (response) {


            let json_data = JSON.parse(response.data);

            let r = { status: false, data: [] };

            await json_data.forEach(element => {
                if (element.location == "Reading_news_mobile") {

                    r = { status: true, data: element };
                }
            });

            return res.json(r);


        })
        .catch(function (e) {

            res.json({ status: false, data: e });
        });


})

app.post('/send_notif', passport_admin.authenticate("operator-rule", { session: false }), (req, res) => {


    var url = 'https://www.khabaronline.ir/api?news=' + req.body.id + '&comment=1&related=1';

    axios({
        method: 'get',
        url: url,
        responseType: 'application/json'
    })
        .then(async function (response) {




            let news = JSON.parse(response.data).newsList[0];


            console.log(news);
            return axios.post('https://fcm.googleapis.com/fcm/send', {

                to: "/topics/news", //
                collapse_key: "News",
                priority: "high",

                data: {
                    id: news.id,
                    click_action: "FLUTTER_NOTIFICATION_CLICK",
                    largeIcon: news.smallThumbnail,
                    bigPicture: news.mediumThumbnail

                },
                notification: {
                    hashCode: parseInt(news.id.toString()),
                    android_channel_id: "khabaronline_notify",
                    title: "خبرآنلاین",
                    body: news.headline,
                    image: news.mediumThumbnail,
                    vibrate: 1,
                    sound: 1,
                    click_action: "FLUTTER_NOTIFICATION_CLICK",
                }

            }, {

                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'key=AAAA7-JVU-8:APA91bF_2Kim0AqE-FB86hMtYPoMi97NA-iOsiqTSXXhtT3bi0R2qYsYEB2tZ1MmKBQCXQ7daztMDnkmCwaLsdZc2VZWwum69mYYtiSSHA1HwZ7ACvgUjd4bxb'
                },
            })
                .then(async function (response) {

                    console.log('sent to app');

                    //web
                    if (req.body.web) {

                        await axios.post('https://fcm.googleapis.com/fcm/send', {

                            to: "/topics/news_web", // کانال دریافت در اپلیکیشن کاربران
                            collapse_key: "New Message",
                            priority: "high",

                            data: {
                                id: news.id,
                                click_action: "../#/news/" + news.id,
                                largeIcon: news.smallThumbnail,
                                bigPicture: news.mediumThumbnail

                            },
                            notification: {
                                hashCode: parseInt(news.id.toString()),
                                android_channel_id: "khabaronline_notify",
                                title: "خبرآنلاین",
                                body: news.headline,
                                image: news.mediumThumbnail,
                                vibrate: 1,
                                sound: 1,
                                click_action: "../#/news/" + news.id,
                            }

                        }, {

                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: 'key=AAAA7-JVU-8:APA91bF_2Kim0AqE-FB86hMtMi97NA-iOsiqTSXXhtT3bi0R2qYsYEB2tZ1MmKBQCXQ7daztMDnkmCwaLsdZc2VZWwum69mYYtiSSHA1HwZ7ACvgUjd4bxb'
                            },
                        });

                    }




                    //save history

                    const history = new History({
                        news_id: news.id,
                        user: req.user._id,
                        title: "خبرآنلاین",
                        body: news.headline,
                        image: news.smallThumbnail,
                        web: req.body.web
                    });


                    await history.save();


                    ////



                    return res.json({ status: true, data: response.data });
                })
                .catch(function (e) {

                    return res.json({ status: false, data: e });
                });


        })
        .catch(function (e) {

            res.json({ status: false, data: e });
        });



});

app.get('/me', passport_admin.authenticate("operator-rule", { session: false }), (req, res) => {
    if (req.user) {
        return res.json({ status: true, data: req.user });
    } else {
        return res.json({ status: false, data: {} });
    }
});


app.post('/save_user', passport_admin.authenticate("admin-rule", { session: false }), async (req, res) => {

    if (req.body._id == null) {



        try {
            await Users.create({ name: req.body.name, mobile: req.body.mobile, roles: ["operator"], code: req.body.code });
            return res.json({ status: true });
        } catch {
            return res.json({ status: false });
        }
    } else {
        try {
            Users.findById(req.body._id).then(async (user) => {
                user.name = req.body.name;
                user.mobile = req.body.mobile;
                user.code = req.body.code;

                await user.save();
                return res.json({ status: true });
            });
        } catch {
            return res.json({ status: false });
        }


    }

});

app.delete('/delete_user', passport_admin.authenticate("admin-rule", { session: false }), async (req, res) => {

    const ObjectId = require('mongodb').ObjectId;

    try {

        await Users.findOneAndDelete({ _id: new ObjectId(req.body._id) });

        return res.json({ deleted: true });
    } catch {
        return res.json({ deleted: false });
    }


});

app.get('/all_user', passport_admin.authenticate("admin-rule", { session: false }), async (req, res) => {

    let users = await Users.find({})
        .lean()
        .exec();
    return res.json(users);

});

app.get('/all_history', passport_admin.authenticate("operator-rule", { session: false }), async (req, res) => {

    let filter = { user: req.user._id };

    if (req.user.roles.includes("admin")) {
        filter = {}

    }
    let histories_count = await History.find(filter)
        .count()
        .exec();

    let histories = await History.find(filter)
        .populate("user", "name")
        .limit(parseInt(req.query.perPage))
        .skip(parseInt(req.query.perPage) * (parseInt(req.query.page)))
        .sort({ createdAt: "descending" })
        .lean()
        .exec();

    return res.json({ total: histories_count, history: histories });

});


app.post("/login_admin", async (req, res, next) => {


    const user = await Users.findOne({
        mobile: req.body.username
    });

    if (!user) {
        return res.status(401).send({
            message: "User not found",
        });
    }

    const validate = user.code == req.body.password;

    if (!validate) {
        return res.status(401).send({
            status: false,
            message: "Wrong Code",
        });
    }

    const JWTTken = JWT.sign(
        { id: user._id, mobile: user.mobile },
        secretOrKey
    );
    return res.status(200).send({
        token: JWTTken,
        message: "wellcome",
        status: true,
    });
});



app.post('/subscribe/web/:topic/:token', (req, res) => {


    return axios.post('https://iid.googleapis.com/iid/v1/' + req.params.token + '/rel/topics/' + req.params.topic, {



    }, {

        headers: {
            'Content-Type': 'application/json',
            Authorization: 'key=AAAA7-JVU-8:APA91bF_2Kim0AqE-FB86hMtYPZrECjggLWGR6gtVK2moMi97NA-iOsiqTSXXhtT3bi0R2qYsYEB2tZ1MmKBQCXQ7daztMDnkmCwaLsdZc2VZWwum69mYYtiSSHA1HwZ7ACvgUjd4bxb'
        },
    })
        .then(async function () {

            return res.json({ status: true });
        })
        .catch(function (e) {

            return res.json({ status: false, data: e });
        });





});

app.get('/ad/web/:id', (req, res) => {


    return res.send('<!DOCTYPE html><html lang="en"><head>    <meta charset="UTF-8">    <meta http-equiv="X-UA-Compatible" content="IE=edge">    <meta name="viewport" content="width=device-width, initial-scale=1.0">    <title>Yektanet Ad</title>  <script type="text/javascript">	now = new Date();	var head = document.getElementsByTagName("head")[0];	var script = document.createElement("script");	script.async = true;	script.type = "text/javascript";	var script_address = "https://cdn.yektanet.com/template/bnrs/yn_bnr.min.js";	script.src = script_address + "?v=" + now.getFullYear().toString() + "0" + now.getMonth() + "0" + now.getDate() + "0" + now.getHours();	head.appendChild(script);</script>  <script>        !function(e,t,n){e.yektanetAnalyticsObject=n,e[n]=e[n] || function(){e[n].q.push(arguments)},e[n].q=e[n].q;var a=t.getElementsByTagName("head")[0],r=new Date,c="https://cdn.yektanet.com/superscript/kfSf4roj/native-khabaronline.app-31134/yn_pub.js?v="+r.getFullYear().toString()+"0"+r.getMonth()+"0"+r.getDate()+"0"+r.getHours(),s=t.createElement("link");s.rel="preload",s.as="script",s.href=c,a.appendChild(s);var l=t.createElement("script");l.async=!0,l.src=c,a.appendChild(l)}(window,document,"yektanet");    </script></head><body>    <div ' + req.params.id + ' ></div></body></html>');
});



// app.get('/test/test/232123',async (req,res)=>{
//     await Users.create({ name: 'admin', mobile:'09194858690', roles: ["admin"], code:1754321743 });
           
// });
