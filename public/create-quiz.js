const btn = document.getElementById('add');
const div = document.getElementById('temp');
let i = 2;

btn.onclick = function(){
    
    div.innerHTML += `
    <p> Question ${ i++} </p>
    <div class="quiz-template">
        <input type="text" placeholder="question">Enter the question</input>
        <input type="text" placeholder="option 1">Enter the option 1</input>
        <input type="text" placeholder="option 2">Enter the option 2</input>
        <input type="text" placeholder="option 3">Enter the option 3</input>
        <input type="text" placeholder="option 4">Enter the option 4</input>
    </div>
    `;
}

    
