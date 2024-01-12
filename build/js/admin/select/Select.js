"use strict"

export default class Select {
    constructor(target, data, code) {
        this.target = target;
        this.data = data;
        this.code = code;
    }

    static getSelectReset(target) {
        let t = document.getElementById(target);
        for (let i = 0; i < t.options.length; i++) t.options[i] = null;
        t.options.length = 0;
    }

    static component(target, data, code) {

        this.getSelectReset(target); //기존 데이터 삭제

        let html = '';

        if (Array.isArray(data)) {
            data.forEach(Element => {
                html += `<option>` + Element + `</option>`;
            });
        } else {
            let dataStudent = Object.values(data.student);
            dataStudent.forEach(Element => {
                if (Element.code == code) html += `<option selected>` + Element[target] + `</option>`;
                else html += `<opton>` + Element[target] + `</opton>`;
            });
        }

        let selectDiv = document.getElementById(target);
        return selectDiv.insertAdjacentHTML('beforeend', html);
    }

    static showSelectedOptons = options => {
        let r = [...optoins].filter(o.selected).map(o => o.values).toString();
    }

    inputData(target, data, code) {
        document.getElementById('target');
    }

}