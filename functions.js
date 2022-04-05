//notifications
$(function() {
    //get list
    var $uList = $(".scroll-box ul");
    var timer = null;
    //clear timer
    $uList.hover(function() {
        clearInterval(timer);
    },
    function() { //set time
        timer = setInterval(function() {
            scrollList($uList);
        }, 1000);
    }).trigger("mouseleave"); //mouse evenement

    function scrollList(obj) {
        //get list size
        var scrollHeight = $("ul li:first").height();
        //scroll one element size
        $uList.stop().animate({
            marginTop: -scrollHeight
        }, 600,
        function() {
            //append the last to the first
            $uList.css({
                marginTop: 0
            }).find("li:first").appendTo($uList);
        });
    }
});

//Menu
$(document).ready(function () {
	$('ul.menu_body').hide();
	$("ul.menu_body li:even").addClass("alt");
    $('p.menu_head').click(function () {
        $('ul.menu_body').slideToggle('medium');
    });
    $('ul.menu_body li a').mouseover(function () {
        $(this).animate({ 
            fontSize: "14px", paddingLeft: "20px" 
        }, 50 );
    });
    $('ul.menu_body li a').mouseout(function () {
        $(this).animate({
             fontSize: "12px", paddingLeft: "10px" 
        }, 50 );
    });
});




function check() {
    var password = document.getElementById("mdp").value;
    var repassword = document.getElementById("confirmation").value;
    
    if(password == repassword) {
         document.getElementById("siok").innerHTML="<br><font color='green'>C'est bon !</font>";
         document.getElementById("submit").disabled = false;
        
     }else {
         document.getElementById("siok").innerHTML="<br><font color='red'>Pas le même</font>";
         document.getElementById("submit").disabled = true; 
     } 
}


//carrousel
function my$(id) {
	return document.getElementById(id);
}
		 
var box=my$("box");
var inner=box.children[0];
var ulObj=inner.children[0];
var list=ulObj.children;
var olObj=inner.children[1];
var arr=my$("arr");
var imgWidth=inner.offsetWidth;
var right=my$("right");
var pic=0;
//créer les boutons selon le nombre d'éléments
for(var i=0;i<list.length;i++){
	var liObj=document.createElement("li");
		 
	olObj.appendChild(liObj);
	liObj.innerText=(i+1);
	liObj.setAttribute("index",i);
		 
	liObj.onmouseover=function () {
	    //Effacer d'abord les styles de tous les boutons
		for (var j=0;j<olObj.children.length;j++){
			olObj.children[j].removeAttribute("class");
		}
		this.className="current";
		pic=this.getAttribute("index");
		animate(ulObj,-pic*imgWidth);
	}	 
}		 
		 
//Définir le premier li dans ol pour avoir une couleur d'arrière-plan 
olObj.children[0].className = "current";
//Cloner le premier li dans un ul, et l'ajouter au dernier dans ul
ulObj.appendChild(ulObj.children[0].cloneNode(true));
		 
var timeId=setInterval(onmouseclickHandle,1000);
//Mise au point à gauche et à droite pour obtenir la fonction de cliquer pour changer d'image
box.onmouseover=function () {
	arr.style.display="block";
	clearInterval(timeId);
};
box.onmouseout=function () {
	arr.style.display="none";
	timeId=setInterval(onmouseclickHandle,1000);
};
		 
right.onclick=onmouseclickHandle;
function onmouseclickHandle() {
	//Si la valeur de pic est 5, qui se trouve être la valeur du nombre de li dans ul-1, la page affiche la sixième image et l'utilisateur pensera que c'est la première image. 
	//Donc, si l'utilisateur clique à nouveau sur le bouton, l'utilisateur devrait voir la deuxième image
	if (pic == list.length - 1) {
		//Comment passer de la 6e image à la première image
		pic = 0;
		ulObj.style.left = 0 + "px";//Rétablir la position de ul à la position par défaut au début
	}
	pic++;//Rendre immédiatement la photo plus 1, puis l'utilisateur verra la deuxième image à ce moment
	animate(ulObj, -pic * imgWidth);//Après pic plus 1, la valeur de pic est 1, puis ul déplace une image
	//Si pic == 5, la sixième image est affichée à ce moment (le contenu est la première image) et le premier petit bouton a une couleur.
	if (pic == list.length - 1) {
		//La couleur de cinquième bouton disparait
		olObj.children[olObj.children.length - 1].className = "";
		//Le premier bouton a la couleur
		olObj.children[0].className = "current";
	} else {
		        //Enlever la couleur de fond de tous les petits boutons
		        for (var i = 0; i < olObj.children.length; i++) {
						olObj.children[i].removeAttribute("class");
					}
				olObj.children[pic].className = "current";
			}
}
left.onclick=function () {
	if (pic==0){
		pic=list.length-1;
		ulObj.style.left=-pic*imgWidth+"px";
	}
	pic--;
	animate(ulObj,-pic*imgWidth);
	for (var i = 0; i < olObj.children.length; i++) {
		olObj.children[i].removeAttribute("class");
	}
	//couleur du bouton 
	olObj.children[pic].className = "current";
};
		 
	//Définir n'importe quel élément et se déplacer vers la position ciblée
	function animate(element, target) {
	    clearInterval(element.timeId);
		//La valeur id de la timer est stockée dans un attribut de l'objet
		element.timeId = setInterval(function () {
			//Obtenir la position actuelle de l'élément
			var current = element.offsetLeft;
			//Distance de déplacement à chaque fois
			var step = 10;
			step = current < target ? step : -step;
			current += step;
			if (Math.abs(current - target) > Math.abs(step)) {
				element.style.left = current + "px";
			} else {
					//Effacer timer
					clearInterval(element.timeId);
					//Aller directement au but
					element.style.left = target + "px";
				}
		}, 10);
	}

//fonction RECERCHER
function afficher(){
	//mettre l'élément choisi dans input
	$("#nom").val($("#liste option:selected").text());
}
$("#liste").on("change",afficher);


function chercher(){
	//var name = document.getElementById('nom').value
	var name = $("#nom").val();
	if(name=="Snowboard"||name=="snowboard"){
		//ouvrir un nouvel onglet
		nwin = window.open(''); 
		//modifier le
		nwin.document.write("<div class='logo'><a href='index.html' style='text-decoration: none;'><img src='assets/img/logo.jpg' height='30' width='30'></a><a href='index.html'><h1 style='display: inline-block;'>Super store !</h1></a></div>");  
		nwin.document.write("</br></br></br>");
		nwin.document.write("<h1>Résultats trouvés</h1>");
		nwin.document.write("<img src='assets/img/produits/produit1.jpg' height='400px',length='300px'>"); 
		nwin.document.write("<img src='assets/img/produits/produit4.jpg' height='400px',length='300px'>"); 
		nwin.focus(); 
		//titre de la page
		nwin.document.title="Snowboard"; 
	}
	else if(name=="Boot"||name=="boot"){
		nwin = window.open(''); 
		nwin.document.write("<div class='logo'><a href='index.html' style='text-decoration: none;'><img src='assets/img/logo.jpg' height='30' width='30'></a><a href='index.html'><h1 style='display: inline-block;'>Super store !</h1></a></div>"); 
		nwin.document.write("</br></br></br>");
		nwin.document.write("<h1>Résultats trouvés</h1>");
		nwin.document.write("<img src='assets/img/produits/produit2.jpg' height='400px',length='300px'>"); 
		nwin.document.write("<img src='assets/img/produits/produit5.jpg' height='400px',length='300px'>"); 
		nwin.focus(); 
		nwin.document.title="Boot"; 
	}
	else if(name=="Fixation"||name=="fixation"){
		nwin = window.open(''); 
		nwin.document.write("<div class='logo'><a href='index.html' style='text-decoration: none;'><img src='assets/img/logo.jpg' height='30' width='30'></a><a href='index.html'><h1 style='display: inline-block;'>Super store !</h1></a></div>"); 
		nwin.document.write("</br></br></br>");
		nwin.document.write("<h1>Résultats trouvés</h1>");
		nwin.document.write("<img src='assets/img/produits/produit3.jpg' height='400px',length='300px'>"); 
		nwin.document.write("<img src='assets/img/produits/produit6.jpg' height='400px',length='300px'>"); 
		nwin.focus(); 
		nwin.document.title="Fixation"; 
	}
	else{
		nwin = window.open(''); 
		nwin.document.write("<div class='logo'><a href='index.html' style='text-decoration: none;'><img src='assets/img/logo.jpg' height='30' width='30'></a><a href='index.html'><h1 style='display: inline-block;'>Super store !</h1></a></div>"); 
		nwin.document.write("</br></br></br>");
		nwin.document.write("<h1>Aucun produit trouvé</h1>");
		nwin.focus(); 
		nwin.document.title="Aucun";
	}
}
$("#rechercher").on("click",chercher);

