"use strict"

export default class List {
    constructor(data) {
        this.data = data;
    }
    static component(data) {
        let html = '';
        let dataStudent = Object.values(data);

        dataStudent.forEach(Element => {
            html += `<tr>` + `\n`;
            html += `    <td>` + Element.student.num + `</td>` + `\n`;
            html += `    <td>` + Element.student.name + `</td>` + `\n`;
            html += `    <td>` + Element.student.school + `</td>` + `\n`;
            html += `    <td>` + Element.student.level + `</td>` + `\n`;
            html += `    <td>` + Element.student.address + `</td>` + `\n`;
            html += `    <td>` + Element.student.teacher + `</td>` + `\n`;
            html += `    <td>` + `\n`;
            html += `        <div class='row'>` + `\n`;
            html += `            <div class='col-sm'>` + `\n`;
            html += `                <textarea class='form-control'>` + Element.student.memo + `</textarea>` + `\n`;
            html += `            </div>` + `\n`;
            html += `        </div>` + `\n`;
            html += `    </td>` + `\n`;
            html += `    <td>` + `\n`;
            html += `        <button type='button' id='btn' class='btn' data-code='` + Element.dataset.code + `'>수정</button>` + `\n`;
            html += `    </td>` + `\n`;
            html += `</tr>` + `\n`;
        });

        let list = document.getElementById('student');
        return list.insertAdjacentHTML('beforeend', html);
    }
}
