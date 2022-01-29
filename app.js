// **************************************************************************************** //
//                                                                                          //
//                                      INIT VARIABLES                                      //
//                                                                                          //
// *****************************************************************************************//

"use strict";

// init pour le menu MENU NAV et Hamburger
const hamburger     = document.querySelector('.hamburger');
const imgHamburger  = document.createElement('img');
const ulMenu        = document.querySelector('ul');
const liMenu        = Array.from(document.querySelectorAll('li'));
const navLi         = Array.from(document.getElementsByClassName('navLi'));

// Si le menu déroulant est avtivé ou non
let menuDeroulant   = false;

// Si l 'écran < 600px le menu Hamburger est activé, je considère ca comme le menu pour Mobile
let screenMobile    = true;

// STICKY est une petite section clin d'oeil sur mon âge
const sticky        = document.querySelector('.sticky');
let stickyOn        = true;

// SECTIONS PAGES - BoxDisplay indique la page active
const sections      = Array.from(document.querySelectorAll('section'));
let boxDisplay      = 0;

// RESPONSIVE MODE - 
const root      =   document.querySelector(':root'); 
let ratio       =   1;    // Ratio pour les Polices d'écritures
let gridNbCol   =   1;    // détermine le nombre de colonne 
let largeur     =   window.innerWidth;    // Ratio pour la taille des éléments

// CHANGE COLORS - Changement couleurs des liens survolés et du menu
const tabCouleur    = ['#b8860b','#b8860b','#fff','#056070','#e34443','#6464fa','#6464fa']; 
let couleur         = '#b8860b';
root.style.setProperty('--clrHover', couleur);

// date
let annee = new Date().getFullYear();

const footer = document.querySelector('footer span').innerHTML = `&nbsp &#169; ${annee}`;


// **************************************************************************************** //
//                                                                                          //
//                                      INIT FUNCTIONS                                      //
//                                                                                          //
// *****************************************************************************************//

//
// FUNCTION MENU DEROULANT //                           
//
let menuDeroulOff = function(noneOrBlock)
    {
        hamburger.innerHTML = "";
        imgHamburger.src = 'pics/menu.svg';
        imgHamburger.style.width = '30px';

        hamburger.append(imgHamburger);
        liMenu.forEach((li)=>
        {
            li.classList.remove('displayBlock');
        });
        ulMenu.className = (noneOrBlock);
        menuDeroulant = false;
    };    

//
// FUNCTION CALCUL RATIO //                           
//
let calculRatio = function(largeur) {
    if (largeur>1520)
        { ratio = 1.6; gridNbCol = 2;
        }
    else
    if (largeur>920 && largeur<1521)
        { ratio = 1.4; gridNbCol = 2;}
    else
    if (largeur<921)
    { ratio = 1.20; gridNbCol = 1}
    root.style.setProperty('--tt', ratio + 'rem');
    root.style.setProperty('--ratio', ratio);
    root.style.setProperty('--gridNbCol', gridNbCol);
    document.querySelector(':root').style.setProperty('--vw', window.innerWidth/100 + 'px');
};    

// **************************************************************************************** //
//                                                                                          //
//                                      PREMIER AFFICHAGE                                   //
//                                                                                          //
// *****************************************************************************************//

imgHamburger.src = 'pics/menu.svg';
imgHamburger.alt = 'menu hamburger';
hamburger.append(imgHamburger);
if (window.innerWidth < 921)
    {
        hamburger.classList.add('displayBlock');
        ulMenu.classList.add('displayNone');
        screenMobile = true;
    }
else
    {   ulMenu.classList.add('displayBlock');
        hamburger.classList.add('displayNone');
        screenMobile = false;
    }


// **************************************************************************************** //
//                                                                                          //
//                                      LES EVENEMENTS                                      //
//                                                                                          //
// *****************************************************************************************//
//
// gestion de menu déroulant 
//
navLi.forEach
    ((li,i) =>
        { li.addEventListener
            ('click', ()=>
                {
                    root.style.setProperty('--clrHover', tabCouleur[i]);
                    if (screenMobile == true)
                    {
                        menuDeroulOff('displayNone');
                    }
                }
            )
        }
    );


//
//  gestion du menu hamburger
//
hamburger.addEventListener('click',()=>
    {   if (menuDeroulant == false)
        {
            imgHamburger.src = 'pics/menu_X.svg';
            imgHamburger.style.width = '15px';

            ulMenu.className = ('displayBlock menuDeroulantOn');
            liMenu.forEach((li)=>
            {
                li.classList.add('displayBlock');
            });
            menuDeroulant = true;
        }   
        else
        {   menuDeroulOff('displayNone');
        }
    });

//
// gestion resize de l'écran - le menu hamburger s'affiche < 921 px
//
window.addEventListener('resize', ()=>
    {   if (window.innerWidth < 921 && screenMobile == false)
        {
            ulMenu.classList.add('displayNone');
            ulMenu.classList.remove('displayBlock');
            hamburger.classList.add('displayBlock');
            hamburger.classList.remove('displayNone');
            screenMobile = true;
        }
        else
        if (window.innerWidth > 920 && screenMobile == true)
        {
            ulMenu.classList.remove('displayNone');
            ulMenu.classList.add('displayBlock');
            hamburger.classList.remove('displayBlock');
            hamburger.classList.add('displayNone');
            screenMobile = false;
            if (menuDeroulant == true)
            {
                menuDeroulOff('displayBlock');
            }
        };
    });
    
//
// Calcul du ratio en fonction de la taille de l'écran - la donnée est envoyé dans :root
//
calculRatio(largeur);    
window.addEventListener('resize', ()=>{
    calculRatio(window.innerWidth);
});

const box = document.querySelector('#contact');
const rect = box.getBoundingClientRect();
document.addEventListener('scroll',()=>{
console.log(rect);
});