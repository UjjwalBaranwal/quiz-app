const btn = document.getElementById('add');
const div = document.querySelectorAll('.temp-container');

document.getElementById('add').addEventListener('click', function(){

    document.querySelectorAll('.temp-container').append.innerHTML = `
        <input type="text" placeholder="question 1">Enter the question</input>
        <input type="text" placeholder="option 1">Enter the option 1</input>
        <input type="text" placeholder="option 2">Enter the option 2</input>
        <input type="text" placeholder="option 3">Enter the option 3</input>
        <input type="text" placeholder="option 4">Enter the option 4</input>`
});

