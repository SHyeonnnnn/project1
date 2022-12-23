document.addEventListener('DOMContentLoaded', function(){  // defer의 역할
    const slideWrap=document.querySelector('.container1');
    const slideContainer=document.querySelector('.list');
    const slide=document.querySelectorAll('.slide');
    const slidePrev=document.getElementById('prev');
    const slidenext=document.getElementById('next');
    const pager=document.querySelector('.pager');
    const pagerBtn=document.querySelectorAll('.pager span');
    const playBt=document.querySelector('#play')
    const pauseBt=document.querySelector('#pause')

    let slideHeight=0;
    let currentIndex=0;
    let slideCount=slide.length;
    let timer=undefined;

    // let topheight=slide[0].offsetHeight;
    // console.log(topheight)

    for(let i=0; i<slideCount; i++){
        if(slideHeight< slide[i].offsetHeight){
            slideHeight=slide[i].offsetHeight;
        }
    }
    // console.log(slideHeight);
    //가장큰 높이값
    slideWrap.style.height=slideHeight+'px';
    slideContainer.style.height=slideHeight+'px';

    //가로배열
    for(let j=0; j<slideCount; j++){
        slide[j].style.left=j*100 +'%';
    }

    //슬라이드 함수**
    function goToSlide(idx){
        slideContainer.classList.add('animated');
        slideContainer.style.left=-100*idx+'%';
        currentIndex=idx;
        for(let k=0; k<pagerBtn.length; k++){
            pagerBtn[k].classList.remove('active');
        }
        pagerBtn[idx].classList.add('active');
    };
    goToSlide(0);
    //버튼활성화
    slidenext.addEventListener('click',function(){
        //goToSlide(currentIndex+1);
        this.prepend
        if(currentIndex==slideCount-1){
            // slidenext.classList.add('disabled')
            goToSlide(0);
        }else{
            // slidenext.classList.remove('disabled')
            goToSlide(currentIndex+1);
        };
    });
    slidePrev.addEventListener('click',function(){
        if(currentIndex==0){
            goToSlide(slideCount-1);
        }else{
            goToSlide(currentIndex-1);
        }
    });
    //자동슬라이드
    autoSlide();
    function autoSlide(){
        timer=setInterval(function(){
            let nextIdx=(currentIndex +1) % slideCount
            goToSlide(nextIdx);
        },2000);
    };
    //멈춤기능
    function stopAutoSlide(){
        clearInterval(timer);
    };
    playBt.addEventListener('click',function(){
        stopAutoSlide();
        autoSlide();
    });
    pauseBt.addEventListener('click',function(){
        stopAutoSlide();
    });
    slideWrap.addEventListener('mouseenter',function(){
        stopAutoSlide();
    });
    slideWrap.addEventListener('mouseleave',function(){
        autoSlide();
    });

    //pager으로 슬라이드 제어
    for(let i=0; i<pagerBtn.length; i++){
        pagerBtn[i].addEventListener('click', function(e){
            // console.log(e.target);
            let pagerNum=e.target.innerText-1;
            // console.log(pagerNum);
            goToSlide(pagerNum);
        })
    }
});
