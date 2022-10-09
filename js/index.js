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
        //导航条
        let lLis = document.querySelector('.dht-top-left>ul');
        let rLis = document.querySelector('.dht-top-right>ul');
        let lCode = '',
            rCode = '';
        let tittopData = getJSON('get', 'json/tieleTop.json');
        tittopData.forEach((item, i) => {
            if (i <= 8) {

                if(item.til == "下载客户端"){
                    lCode += `<li class="moveH" data-moveData="${item.moveData}"><a href="#"><i class="${item.logo}"></i>${item.til}</a></li>`;
                }else if (item.til == "搜索") {
                    lCode +=`<li><div class="search" style="display: inline-block;">
                    <input type="text" class="searchInput">
                    <i class="${item.logo} ss" style="color: #333"></i>
                  </div></li>`
                } else if (item.move) {
                    if (item.show == 0) {
                        lCode += `<li class="moveH onshow sy" data-moveData="${item.moveData}"><a href="#">${item.til}</a><i class="xzHov ${item.logo}"></i></li>`;
                        // return;
                    } else {
                        lCode += `<li class="moveH" data-moveData="${item.moveData}"><a href="#"  class="jumpHov">${item.til}</a></li>`;
                    }

                } else {
                    lCode += `<li><a href="#" class="jumpHov">${item.til}</a></li>`;
                }

            } else {

                if (item.til == '登录') {
                    rCode += `<li><div  class="loginBtn Btn" style="display: inline-block;color=#fff">登录</div></li>`;
                } else if (item.til == '投稿') {
                    rCode += `<li>
                    <div class="sendBtn Btn" style="display: inline-block;"><i class="${item.logo}">
                    
                    </i>投稿</div></li>`;
                } else if (item.logo) {
                    if (item.move) {
                        rCode += `<li class='jumpHov moveH' data-moveData="${item.moveData}">
                        <div style="display: inline-block;">
                         <a href=""><i class="${item.logo}" style="font-size: 10px;"></i> </a></br>
                            <a href="" style="font-size: 14px;">${item.til}</a>
                        </div>
                           
                        </li>`;
                    } else {
                        rCode += `<li class="jumpHov">
                            <div style="display: inline-block;">
                               <a href=""><i class="${item.logo}"></i></a></br>
                               
                                <a href=""style="font-size: 14px;">${item.til}</a>
                            </div>
                        </li>`;
                    }
                }
            }
        });
        lLis.innerHTML=lCode;
        rLis.innerHTML=rCode;
        // 标题内容
        let headerC = document.querySelector('.header-center');
        let headerR = document.querySelector('.header-right');
        let hcCode = '';
        let hrCode = '';
        let headerTitData = getJSON('get','json/headerTable.json');
        headerTitData.forEach((item,i)=>{
            // console.log(i);
            if (i<12) {
                console.log(1);
                if (item.move==1) {
                    hcCode+=`<a href="#" class="header-a moveHov">${item.name}</a>`
                }else{
                    hcCode+=`<a href="#" class="header-a">${item.name}</a>`
                }
            }else if(12<=i&&i<24){
                console.log(2);
                if (item.move==1) {
                    hcCode+=`<a href="#" class="header-a moveHov">${item.name}</a>`
                }else{
                    hcCode+=`<a href="#" class="header-a">${item.name}</a>`
                }
            }else if(i<27){
                console.log(3);
                if (item.move==1) {
                    hrCode+=`<a href="#" class="header-span moveHov">
                    <i class="${item.logo}"></i>
                    <span>${item.name}</span>
                  </a>`
                }else{
                    hrCode+=`<a href="#" class="header-span">
                    <i class="${item.logo}"></i>
                    <span>${item.name}</span>
                  </a>`
                }
            }else{
                console.log(4);
                if (item.move==1) {
                    hrCode+=`<a href="#" class="header-span moveHov">
                    <i class="${item.logo}"></i>
                    <span>${item.name}</span>
                  </a>`
                }else{
                    hrCode+=`<a href="#" class="header-span">
                    <i class="${item.logo}"></i>
                    <span>${item.name}</span>
                  </a>`
                }
            }
        })
        headerC.innerHTML=hcCode;
        headerR.innerHTML=hrCode;


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
    // 动画事件委托
    const dhWt = function dhWt() {
        let dhtTop = document.querySelector('.dht-top');
        dhtTop.onmouseover = function (e) {
            if (Array.from(e.target.classList).includes('jumpHov')) {
                if (e.target.tagName=="A") {
                    e.target.classList.add('jump');
                }else{
                    e.target.children[0].children[0].classList.add('jump');
                    console.log( e.target.children[0].children[0]);
                }
            }
        }
        dhtTop.onmouseout = function (e) {
            if (Array.from(e.target.classList).includes('jumpHov')) {
                if (e.target.tagName=="A") {
                    e.target.classList.remove('jump');
                }else{
                    e.target.children[0].children[0].classList.remove('jump');
                    console.log( e.target.children[0].children[0]);
                }
            }
        }
    }
    return {
        init() {
            initHerder();
            // lookdhl();
            window.onscroll = function () {
                showTop(); //判断导航栏应是那种样式
            }
            dhWt();
        }
    }
})();
bili.init();