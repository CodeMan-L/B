let bili = (function () {
    let HTML = document.documentElement || document.body;
    const getJSON = function getJSON(sendType = 'GET', jsonData, resData) { //默认为Get请求的获取JSON数据工具类
        let xhr = new XMLHttpRequest();
        xhr.open(sendType, jsonData, false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resData = JSON.parse(xhr.response);
                return resData; //这是响应的return 不是函数返回值

            }
        }
        xhr.send(null);
        return resData;
    };
    // 初始化头部内容
    const initHerder = function initHerder() {
        let lLis = document.querySelector('.dht-top-left>ul');
        let rLis = document.querySelector('.dht-top-right>ul');
        let lCode = '',
            rCode = '';
        let tittopData = getJSON('get', 'json/tieleTop.json');
        tittopData.forEach((item, i) => {
            if (i <= 8) {

                if(item.til == "下载客户端"){
                    lCode += `<li class="jumpHov moveH" data-moveData="${item.moveData}"><a href="#"><i class="${item.logo}"></i>${item.til}</a></li>`;
                }else if (item.til == "搜索") {
                    lCode +=`<li><div class="search" style="display: inline-block;">
                    <input type="text" class="searchInput">
                    <i class="${item.logo} ss" style="color: #333"></i>
                  </div></li>`
                } else if (item.move) {
                    if (item.show == 0) {
                        lCode += `<li class="jumpHov moveH onshow sy" data-moveData="${item.moveData}"><a href="#">${item.til}</a><i class="xzHov ${item.logo}"></i></li>`;
                        // return;
                    } else {
                        lCode += `<li class="jumpHov moveH" data-moveData="${item.moveData}"><a href="#">${item.til}</a></li>`;
                    }

                } else {
                    lCode += `<li class="jumpHov"><a href="#">${item.til}</a></li>`;
                }

            } else {

                if (item.til == '登录') {
                    rCode += `<li><div  class="loginBtn Btn" style="display: inline-block;">登录</div></li>`;
                } else if (item.til == '投稿') {
                    rCode += `<li>
                    <div class="sendBtn Btn" style="display: inline-block;"><i class="${item.logo}">
                    
                    </i>投稿</div></li>`;
                } else if (item.logo) {
                    if (item.move) {
                        rCode += `<li class='moveH' data-moveData="${item.moveData}">
                        <div style="display: inline-block;">
                         <a href="" class="sendBtn Btn"><i class="${item.logo} jumpHov" style="font-size: 10px;"></i> </a></br>
                            <a href="" class="sendBtn Btn" style="font-size: 14px;">${item.til}</a>
                        </div>
                           
                        </li>`;
                    } else {
                        rCode += `<li>
                            <div style="display: inline-block;">
                               <a href=""><i class="${item.logo} jumpHov"></i></br></a>
                               
                                <a href="" class="sendBtn Btn" style="font-size: 14px;">${item.til}</a>
                            </div>
                        </li>`;
                    }
                }
            }
        });
        lLis.innerHTML=lCode;
        rLis.innerHTML=rCode;
    }
    // 监听事件
    const looktit = function looktit() {
        let Lazy = new IntersectionObserver(function (changes) {

            if (changes.isIntersecting) {

                console.log('完全显示');

                // Lazy.unobserve(changes[i].target)

            } else {
                console.log('完全显示');
            }
        }, {
            threshold: [1]
        })
        let data = document.querySelector('.tit');
        Lazy.observe(data); //添加监视内容 

    }
    const showTop = function showTop() {
        let dhtTop = document.querySelector('.dht-top');
        let dhtTit = document.querySelectorAll('.dht-tit');
        let sy = document.querySelector('.sy');

        if (HTML.scrollTop != 0) {
            let cls = dhtTop.classList;
            dhtTit[0].classList.add('onshow');
            dhtTit[1].classList.remove('onshow');
            sy.classList.remove('onshow');
            cls.forEach((item) => {
                if (item == 'intop') {
                    cls.remove('intop');
                }
            })
            cls.add('ontop');

        } else {
            let cls = dhtTop.classList;
            dhtTit[1].classList.add('onshow');
            dhtTit[0].classList.remove('onshow');
            sy.classList.add('onshow');
            cls.forEach((item, i) => {
                if (item == 'ontop') {
                    cls.remove('ontop');
                }
            })
            cls.add('intop');
        }
    }

    return {
        init() {
            initHerder();
            // lookdhl();
            window.onscroll = function () {
                showTop(); //判断导航栏应是那种样式
            }
        }
    }
})();
bili.init();