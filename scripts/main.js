var myImage = document.querySelector('img');
myImage.onclick = function () {
    var mySrc = myImage.getAttribute('src');
    if (mySrc === 'images/bg_chahua_good.png'){
        myImage.setAttribute('src','images/bg_chahua_haze.png');
    }else {
        myImage.setAttribute('src','images/bg_chahua_good.png');
    }
}

/*var myButton = document.querySelector('button');
var myHeading = document.querySelector('h1');

function setUserName() {
    var myName = prompt('Please enter your name.');
    localStorage.setItem('name',myName);
    myHeading.innerHTML = 'Mozilla is cool,'+myName;
}

if (!localStorage.getItem('name')){
    setUserName();
}else {
    var storedName =localStorage.getItem('name');
    myHeading.innerHTML = "Mozilla is cool,"+storedName;
}

myButton.onclick = function () {
    setUserName();
}*/

var buttons = document.querySelectorAll('button');
for (var i =0; i<buttons.length;i++){
    buttons[i].addEventListener('click',createParagraph);
}

function createParagraph() {
    var para = document.createElement('p');
    para.textContent = 'You clicked the button';
    document.body.appendChild(para);
}


