const cfetch = Object();
cfetch.getUrl = (url, parm)=>{
    let parms = "";
    // if(window.location.href.indexOf("localhost") !== -1){// !=-1含有 ==-1不含有
    //     url = "http://localhost:5000" + url
    // }

    let index = 0;
    Object.keys(parm).forEach(function(key){
        let separator = "&";
        if (index === 0 && parms.indexOf("?") === -1) {
            separator = "?"
        }
        parms = parms + separator + String(key) + "=" + (parm[key] ? String(parm[key]) : "");
        index++;
    });

    let fullUrl = url + parms;
    return fullUrl
};

export default cfetch