import * as utils from './utils.js';

let url = window.location.pathname;
let fileName = url.substring(url.lastIndexOf('/')+1);
document.querySelector('body').addEventListener('onclick', on_load_page(fileName));

function on_load_page(pageName) {
    console.log('on_load_page()')

    let pageName_2_navItem = {
        'index.html'      : 'nav-item-home',
        'articles.html'   : 'nav-item-articles',
        'projects.html'   : 'nav-item-projects',
        'resume.html'     : 'nav-item-resume',
        'contact-me.html' : 'nav-item-contact-me',
    }

    try {
        let navItemId = pageName_2_navItem[pageName]
        let x = document.getElementById(navItemId)
        x.style.backgroundColor = 'pink'
        console.log('set the color to pink')
    } catch {
        console.log('key error in pageName_2_navItem ')
    }

    switch(pageName){
        case 'contact-me.html':
            document.getElementById('send_button_id').onclick = write_to_db
            console.log(`mapped the onclick to send button`)
            break
        default:
            break
    }

}

function send_feedback() {
    console.log('send_feedback ')
    /* connect to firebase real time DB, store the feed back with date, time, ip address.*/
}

function dump(snapshot) {
    console.log('dump() : FB data dumping')
    if (snapshot.exists()) {
        console.log(snapshot.val());
    } else {
        console.log('No data exists :err in dump')
    }
}

function refresh_data() {
    let ref = db.ref("/customer_1krtgp/");
    ref.on('value', get_water_level)
    console.log('update request is made. wait for the response.')
}

function err_func(error) {
    if(error){
        console.log("Failed with error :" + error)
    } else {
        console.log('success!!!')
    }
}

let firebaseConfig = {
    serviceAccount: "",
    databaseURL: "https://test-e3f20-default-rtdb.firebaseio.com/"
};

firebase.initializeApp(firebaseConfig);
let db = firebase.database();
console.log(' Firbebase init Done')

let ref = db.ref("/home_page/");
ref.on('value', dump)

function write_to_db() {
    console.log('write_to_db')
    let name1 = document.getElementById("name")
    let email = document.getElementById("email")
    let msg = document.getElementById("message")
    console.log(name1.value)
    console.log(email.value)
    console.log(msg.value)
    let key = Math.floor(Math.random() * 100000).toString()
    console.log(key)
    let data = { [key] : { name: name1.value, email: email.value, msg : msg.value} }
    ref.update(data, err_func);//overwrite
}
