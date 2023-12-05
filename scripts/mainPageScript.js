function func1() {
    // console.log("button step 1 click!");
    document.getElementById("step1").style.display = "none";
    var btnNext = document.getElementById("step2");
    randomShow(btnNext);
}

function func2() {
    // console.log("button steop 2 click!");
    document.getElementById("step2").style.display = "none";
    var btnNext = document.getElementById("step3");
    randomShow(btnNext);
}

function func3() {
    // console.log("button step 3 click!");
    document.getElementById("step3").style.display = "none";
    var btnNext = document.getElementById("step4");
    randomShow(btnNext);
}

function func4() {
    // console.log("button step 4 click!");
    document.getElementById("step4").style.display = "none";
    var btnNext = document.getElementById("step5");
    randomShow(btnNext);
}

function func5() {
    // console.log("button step 5 click!");
    document.getElementById("step5").style.display = "none";
    var btnNext = document.getElementById("step1");
    randomShow(btnNext);
    btnNext.style.transitionDelay
}

function randomShow(e) {
    e.style.display = "block";
    var x = Math.ceil(Math.random() * 700);
    var y = Math.ceil(Math.random() * 900) - 450;
    console.log("x = " + x + " ,  y = " + y);

    // transform
    e.style.transform = "translate(" + x + "px," + y + "px)";
    if (x % 3 == 0 || y % 3 == 0 || (x + y) % 3 == 0) {
        var ang;
        if (x > y)
            ang = (x - y) % 360;
        else
            ang = (x + y) % 360;
        e.style.transform = "rotate(" + ang + "deg)";
        console.log("rotate " + ang + " degree!")
    }
    
    if ((x + y) % 5 == 0) {
        e.style.transform = "skew(" + y % 360 + "deg, -" + x + "deg)";
    }
    else {
        if (x % 3 > 0)
            e.style.transform = "perspective(" + (y % 10) + "px)";
        else
            e.style.transform = "perspective(" + (x % 10) + "px)";
    }

    // delay
    if (y % 3 == 1)
        e.style.transitionDelay = "1s";
    else if (x % 3 == 1)
        e.style.transitionDelay = "3s";
}