var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slide_images");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

function openMenu() {
    document.getElementById("sousMenu").style.zIndex = "2";
    document.getElementById("tata").style.position = "relative";
    document.getElementById("tata").style.zIndex = "-1";
    document.getElementById("noInspi").style.display = "block";
    document.getElementById("noInspi").style.width = "100%";
    document.getElementById("sousMenu").style.width = "100%";
}

function closeMenu() {
    document.getElementById("tata").style.zIndex = "0";
    document.getElementById("noInspi").style.width = "100%";
    document.getElementById("noInspi").style.display = "none";
    document.getElementById("sousMenu").style.width = "0";
}

function openMenu2() {
    document.getElementById("sousMenu").style.width = "100%";
}

function closeMenu2() {
    document.getElementById("sousMenu").style.width = "0";
}

function openPopUpClemence() {
    document.getElementById("clemence").style.display = "block";
    document.getElementById("popUpClemence").style.display = "block";
}

function closePopUpClemence() {
    document.getElementById("clemence").style.display = "none";
    document.getElementById("popUpClemence").style.display = "none";
}

function openPopUpNour() {
    document.getElementById("nour").style.display = "block";
    document.getElementById("popUpNour").style.display = "block";
}

function closePopUpNour() {
    document.getElementById("nour").style.display = "none";
    document.getElementById("popUpNour").style.display = "none";
}

function openPopUpLeaAngelina() {
    document.getElementById("lea-angelina").style.display = "block";
    document.getElementById("popUpLeaAngelina").style.display = "block";
}

function closePopUpLeaAngelina() {
    document.getElementById("lea-angelina").style.display = "none";
    document.getElementById("popUpLeaAngelina").style.display = "none";
}

function openPopUpAlexia() {
    document.getElementById("alexia").style.display = "block";
    document.getElementById("popUpAlexia").style.display = "block";
}

function closePopUpAlexia() {
    document.getElementById("alexia").style.display = "none";
    document.getElementById("popUpAlexia").style.display = "none";
}

function openPopUpBaptiste() {
    document.getElementById("baptiste").style.display = "block";
    document.getElementById("popUpBaptiste").style.display = "block";
}

function closePopUpBaptiste() {
    document.getElementById("baptiste").style.display = "none";
    document.getElementById("popUpBaptiste").style.display = "none";
}

function openPopUpBANCAL() {
    document.getElementById("BANCAL").style.display = "block";
    document.getElementById("popUpBANCAL").style.display = "block";
}

function closePopUpBANCAL() {
    document.getElementById("BANCAL").style.display = "none";
    document.getElementById("popUpBANCAL").style.display = "none";
}

function openPopUpPb1() {
    document.getElementById("pb1").style.display = "block";
    document.getElementById("popUpPb1").style.display = "block";
}

function closePopUpPb1() {
    document.getElementById("pb1").style.display = "none";
    document.getElementById("popUpPb1").style.display = "none";
}

function openPopUpPb2() {
    document.getElementById("pb2").style.display = "block";
    document.getElementById("popUpPb2").style.display = "block";
}

function closePopUpPb2() {
    document.getElementById("pb2").style.display = "none";
    document.getElementById("popUpPb2").style.display = "none";
}

function openPopUpPb3() {
    document.getElementById("pb3").style.display = "block";
    document.getElementById("popUpPb3").style.display = "block";
}

function closePopUpPb3() {
    document.getElementById("pb3").style.display = "none";
    document.getElementById("popUpPb3").style.display = "none";
}

function openPopUpPb4() {
    document.getElementById("pb4").style.display = "block";
    document.getElementById("popUpPb4").style.display = "block";
}

function closePopUpPb4() {
    document.getElementById("pb4").style.display = "none";
    document.getElementById("popUpPb4").style.display = "none";
}

function openPopUpPb5() {
    document.getElementById("pb5").style.display = "block";
    document.getElementById("popUpPb5").style.display = "block";
}

function closePopUpPb5() {
    document.getElementById("pb5").style.display = "none";
    document.getElementById("popUpPb5").style.display = "none";
}