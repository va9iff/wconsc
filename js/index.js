// // ----------RELODER----------
// $(document).ready(function() {
//   $(".loader").delay(1000).fadeOut("slow")
//     $("#overlayer").delay(1000).fadeOut("slow")
// })


// ----------STICKY NAVBAR----------
var navbar = document.querySelector("header");
var sticky = 45;
const logoWhite = document.getElementById("logo-white");
const logo = document.getElementById("logo");
function myFunction() {
  if (window.scrollY >= sticky) {
    navbar.classList.add("sticky-nav")
    logoWhite.classList.add("d-none")
    logo.classList.remove("d-none")
  }
  if (window.scrollY < sticky) {
    navbar.classList.remove("sticky-nav")
    logo.classList.add("d-none")
    logoWhite.classList.remove("d-none")
  }
}
window.onscroll = function() {myFunction()};

// ----------HAMBURGER ANIMATION----------
const menuBtn = document.querySelector('.menu-btn');
let menuOpen = false;
menuBtn.addEventListener('click', () => {
  if(!menuOpen) {
    menuBtn.classList.add('open');
    menuOpen = true;
  } else {
    menuBtn.classList.remove('open');
    menuOpen = false;
  }
});
const btn = document.querySelector(".menu-btn")
const collapse = document.querySelector(".nav-menu-collapse")
btn.addEventListener('click' , function() {
    collapse.classList.toggle("visible")
});

// ----------FAQs DROPDOWN ANSWER----------
var acc = document.getElementsByClassName("card-question");
var answers = document.querySelectorAll(".answer-collapse")
var i;
let ansOpen = false
for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    var ans = this.nextElementSibling;
    if(!ansOpen) {
      for (let j  = 0; j < answers.length; j++) {
        answers[j].classList.remove('visible')
      }
      ans.classList.add('visible');
      ansOpen = true;
    } else {
      
      ans.classList.remove('visible');
      ansOpen = false;
    }
  })
}


// ----------COMMENTS----------

let addBtn=document.querySelector(".send-btn");
  let inputName=document.querySelector(".input-name");
  let inputTxt=document.querySelector(".input-text");
  let error=document.querySelector(".error");
  let listComments=document.querySelector(".comment-items")

  addBtn.addEventListener("click",function(e){
      e.preventDefault();
      let username=inputName.value;
      let usercomment=inputTxt.value;

      let date= new Date();


      if(username=="" && usercomment==""){
           error.classList.remove("d-none")
      }
      else{
        error.classList.add("d-none")
      }

      if(localStorage.getItem("comments")==null){
        localStorage.setItem("comments",JSON.stringify([]));
      }
     
      let comments=JSON.parse(localStorage.getItem("comments"));

      let comment={
          userName:username,
          userComment:usercomment,
          date:date.toLocaleTimeString()
      }
      comments.push(comment);
      getcommentBody(comment);
      
      localStorage.setItem("comments",JSON.stringify(comments));
      inputName.value=" ";
      inputTxt.value=" ";
      commentCount();

  })

  getComment();

  function getComment(){
    let comments=JSON.parse(localStorage.getItem("comments"));
    comments.forEach(comment => {
        getcommentBody(comment)
    });
    
  }

  function getcommentBody(comment){
    listComments.innerHTML+=`
<li class="d-flex">
                                    <div class="profile-photo"> <img src="./assets/images/comment-avatar.png" alt=""></div>
                                    <div class="comment-content">
                                        <div class="comment-headline">
                                            <h5>${comment.userName}</h5>
                                            <span>${comment.date}</span>
                                            <a href="#">
                                                <i class="fa fa-reply"></i>
                                                Reply
                                            </a>
                                        </div>
                                        <div class="comment-text">
                                            <p>${comment.userComment}</p>
                                        </div>
                                    </div>
                                </li>`
  }
   

  commentCount();

  function commentCount(){
    let count=document.querySelector(".count")
    let comments=JSON.parse(localStorage.getItem("comments"));
    count.innerHTML=comments.length
  }