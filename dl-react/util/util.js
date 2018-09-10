const cfetch = Object();
cfetch.getUrl = (url, parm)=>{
    let fullUrl = "";
    if(window.location.href.indexOf("localhost") !== -1){// !=-1含有 ==-1不含有
        fullUrl = "http://localhost:5000/api" + url
    } else {
        fullUrl = url
    }

    let index = 0;
    Object.keys(parm).forEach(function(key){
        let separator = "&";
        if (index === 0 && fullUrl.indexOf("?") === -1) {
            separator = "?"
        }
        fullUrl = fullUrl + separator + String(key) + "=" + (parm[key] ? String(parm[key]) : "");
        index++;
    });
    return fullUrl
};

export default cfetch