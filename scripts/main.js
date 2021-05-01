 function on_load_home(pageName) {
    console.log('changing inner HTML')
    x = document.getElementById(pageName)
    x.style.backgroundColor = "pink"
}

function send_feedback() {
    console.log('send_feedback ')
    /* connect to  firebase real time DB, store the feed back with date, time, ip address. */
}


