      
    //  document.querySelectorAll('.carousel .image-box li a').style.height = document.querySelectorAll('.carousel').offsetHeight

        function Carousel(object) {
            this.init(object)
            this.setPoint();
            this.object = Object.assign({}, object);
        }
        //初始化
        Carousel.prototype.init = function (object) {
            
            if (object.auto) {
                this.auto();
            }
            this.initEle(object)
            this.transitionend();
            this.MoveOut();
            this.Event(object);
            this.move()
            this.timer;
            this.boolean = true;
        }

        Carousel.prototype.initEle = function (object) {

            var ele = object.ele
            
            var banner = document.querySelector(ele);

            let [imageBox, prev, next, pointBox] = [...banner.children];

            this.width = object.width || imageBox.offsetWidth
            this.height = object.height || banner.offsetWidth
               
            imageBox.style.cssText = `width: ${this.width*6}px;-webkit-transform: translateX(${-this.width}px);
            transform: translateX(${-this.width})px`;
            banner.style.cssText = `width: ${this.width}px;height:${this.height}px;`

            this.imageBox = imageBox;
            this.prev = prev;
            this.next = next;
            this.pointBox = pointBox;
            this.oli = pointBox.getElementsByTagName('a');
            this.index = 1;
            this.banner = banner;
           
            //让图片随着宽高自适应
           var a = document.querySelectorAll('.carousel .image-box li a')
           for (let i = 0; i < a.length; i++) {
              a[i].style.width = `${this.width}px`
               a[i].style.height = `${this.height}px`
           }

           this.prev.style.cssText = `width:${this.width/14}px;height:${this.height/18}px;font-size:${this.height/20}px;line-height:${this.height/18}px`;
           this.next.style.cssText = `width:${this.width/14}px;height:${this.height/18}px;font-size:${this.height/20}px;line-height:${this.height/18}px`
          
        }

        //   自动轮播
        Carousel.prototype.auto = function () {
            clearInterval(this.timer)
            this.timer = setInterval(() => {
                this.index++;
                this.addTransition();
                this.setTranslateX(-this.index * this.width);
                this.setPoint();
            }, 4000);

        };

        // 添加过渡
Carousel.prototype.addTransition = function (object) {
            this.imageBox.style.webkitTransition = "all .5s";
            this.imageBox.style.mozTransition = "all .5s";
            this.imageBox.style.transition = "all .5s";
        };
        //  删除过渡  
        Carousel.prototype.removeTransition = function () {
            this.imageBox.style.webkitTransition = "none";
            this.imageBox.style.mozkitTransition = "none";
            this.imageBox.style.transition = "none";
        };
        // 设置移动
        Carousel.prototype.setTranslateX = function (translateX) {
            this.imageBox.style.webkitTransform = "translateX(" + translateX + "px)";
            this.imageBox.style.mozkitTransform = "translateX(" + translateX + "px)";
            this.imageBox.style.transform = "translateX(" + translateX + "px)";
        };


        // 过渡结束事件
        Carousel.prototype.transitionend = function () {

            //绑定过渡结束事件   设置无缝滚动和无缝滑动
            this.banner.addEventListener('transitionend', () => {
                //无缝滚动            
                if (this.index >= 5) {
                    this.index = 1;
                    this.removeTransition();
                    this.setTranslateX(-this.index * this.width);
                }
                //无缝滑动
                else if (this.index <= 0) {
                    this.index = 4;
                    this.removeTransition();
                    this.setTranslateX(-this.index * this.width);
                }
                this.setPoint()
            });
        }

        // 点移动
        Carousel.prototype.setPoint = function () {
              
            for (let i = 0; i < this.oli.length; i++) {
                this.oli[i].classList.remove('now')
                try {
                this.oli[this.index - 1].classList.add('now')
                    
                } catch (error) {
                    
                }
            }
        };


        // 移入移出事件
        Carousel.prototype.MoveOut = function () {

            this.banner.onmouseover = () => {
                clearInterval(this.timer);
            }

            this.banner.onmouseout = () => {
                
                this.object.auto && this.auto();
            }
        }

        // 移动事件
        Carousel.prototype.move = function () {


            let {oli,imageBox,width,index} = this

            var event = object.type ? 'mouseenter' : 'click';
            
            var that = this
            for (let i = 0; i < oli.length; i++) {
                oli[i].inde = i;
                oli[i].addEventListener(event, function () {
                    
                    for (let i = 0; i < oli.length; i++) {
                         oli[i].classList.remove('now')
                        oli[this.inde].classList.add('now')
                    }

                    imageBox.style.transition = 'all 0.5s';
                    // [this.inde + 1] +1 是因为this.inde 默认为零
                    imageBox.style.transform = 'translateX(' + (-[this.inde + 1] * width) + 'px)';

                    // 传给index
                   that.index = [this.inde + 1]
                }, false)
            }
        }

        // 左右点击事件
        Carousel.prototype.Event = function () {
        
              clearInterval(this.timer);
           
            //向左滚动事件
            var prev = () => {
                if(this.boolean){
                    this.setPoint();
                    this.index--;
                    this.addTransition()
                    this.setTranslateX(-this.index * this.width)

                    // 添加过渡结束事件
                    clearInterval(this.timer);
                    this.banner.addEventListener('transitionend', () => {
                        if (this.index <= 0) this.index = 4;
                        this.removeTransition();
                        this.setTranslateX(-this.index * this.width);
                    }, false)
                    this.boolean = false;
                    setTimeout(() => {
                        this.boolean = true;
                    }, 500);//一秒内不能重复点击

                }

             
            }

            // 向右滚动
            var next = () => {
                if (this.boolean) {
                    console.log(this);
                    
                    this.setPoint();
                    this.index++;
                    this.addTransition()
                    this.setTranslateX(-this.index * this.width)

                    clearInterval(this.timer);
                    // 添加过渡结束事件
                    this.banner.addEventListener('transitionend', () => {
                        if (this.index >= 5) {
                            this.removeTransition();
                            this.index = 1;
                        }
                    }, false)

                    this.boolean = false;
                    setTimeout( () => {
                        this.boolean = true;
                    }, 500);//一秒内不能重复点击

                }

            };
             
          
            this.next.addEventListener('click', next, false)
               this.prev.addEventListener('click', prev, false)

        }

  var bodyWidth = document.documentElement.clientWidth;
  var bodyHeight = document.documentElement.clientHeight;


var object = {
    ele: '.carousel',
    width: bodyWidth,
    height: bodyHeight-86,
    auto: true,
    type: 'enter',
    durtion:1
}

new Carousel(object);
   
