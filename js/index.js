let bili = (function () {
    const getJSON = function getJSON(sendType, jsonData, resData) {
        let xhr = new XMLHttpRequest();
        xhr.open(sendType, jsonData, false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resData = JSON.parse(xhr.response);
                return resData;
            }
        }
        xhr.send('获取JSON');
    };
    const getWinW = function getWinW(bodytype) {
            let W =  window.innerWidth || document.documentElement.clientWidth || document.body.lientWidth;
            let her = document.querySelector('header');
            console.log(her);
            // her.style.width=W+'px';
            console.log("当前视口宽度为"+W);
        

    return bodytype;
    }
    return {
        init() {
            getWinW();
            window.onresize=function(){
                getWinW();
			}
        }
    }
})();
bili.init();