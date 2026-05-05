let btn = document.querySelector("#submitBtn");
let re = document.querySelector("#resetBtn");
let input = document.querySelector("#task");
let add = document.querySelector("#add");
let ul = document.querySelector("#list");
let h4 = document.querySelector("h4"); // empty message
let counter = document.querySelector("#counter");


//  Counter function
function updateCount(){
    let items = ul.children;
    let count = 0;

    for(let i = 0; i < items.length; i++){
        let li = items[i];
        let check = li.querySelector("input");

        if(!check.checked){
            count++;
        }
    }

    counter.textContent = "Pending: " + count;
}


//  Add Task
add.addEventListener("click", function(){

    let value = input.value.trim();

    // empty check
    if(value === ""){
        alert("Please Enter The Valid Text");
        return;
    }

    // duplicate check
    let items = ul.children;
    for(let i = 0; i < items.length; i++){
        let text = items[i].textContent.trim();

        if(text === value){
            alert("Task Already Exists!");
            return;
        }
    }

    // hide empty message
    h4.textContent = "";

    let li = document.createElement("li");

    let check = document.createElement("input");
    check.type = "checkbox";

    // checkbox toggle
    check.addEventListener("change", function(){
        if(check.checked){
            li.style.textDecoration = "line-through";
        }else{
            li.style.textDecoration = "none";
        }
        updateCount();
    });

    li.appendChild(check);
    li.appendChild(document.createTextNode(" " + value));

    ul.appendChild(li);

    input.value = "";

    updateCount();
});


//  Done Button (remove checked)
btn.addEventListener("click", function(){

    let items = ul.children;
    let found = false;

    for(let i = items.length - 1; i >= 0; i--){
        let li = items[i];
        let check = li.querySelector("input");

        if(check.checked){
            li.remove();
            found = true;
        }
    }

    if(!found){
        alert("No Task Selected!");
    }

    // empty message
    if(ul.children.length === 0){
        h4.textContent = "NO TASK YET!";
    }

    updateCount();
});


//  Reset Button
re.addEventListener("click", function(){
    ul.innerHTML = "";
    h4.textContent = "NO TASK YET!";
    updateCount();
});


//  Enter Key
input.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        add.click();
    }
});


// 🔹 Initial call
updateCount();
