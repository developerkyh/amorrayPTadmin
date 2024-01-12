"use strict"

let studentData = JSON.parse(JSON.stringify(studentdata));

// import List from './build/js/admin/table/List.js';
// import SelectComponent from './build/js/admin/select/Select.js';
import {List, Select } from './build/js/admin/index.js';



// let data = document.getElementById('data').innerHTML;


List.component(studentData);

window.onload = function(){
    
    let buttons = document.querySelectorAll('#student .btn');
    let closePopup = document.querySelector('.modal .close');
    let layerPopup = document.getElementById('modalPopup');
    let modifyInfo = document.getElementById('modifyInfo');
    let btn = document.getElementById('btn');
    
    btn.addEventListener('click', function () {
        let layerPopup =  document.querySelector('.modal');
        layerPopup.classList.toggle('active');
    });
    closePopup.addEventListener('click', event => {
        layerPopup.classList.toggle('active');
    });

    buttons.forEach(item => {
        item.addEventListener('click', event => {
            Select.component('school', studentData, item.dataset.code);
            // Select.component('teacher', studentData, item.dataset.code);
            // Select.component('name', studentData, item.dataset.code);
            
            if (layerPopup.classList.contains('active')) {
                layerPopup.classList.remove('active');
                if (layerPopup.classList.toggle('active') == false) {
                    layerPopup.classList.add('active');
                }
            } else {
                layerPopup.classList.toggle('active');
            }
        });
    });
}
