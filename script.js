
let text = document.querySelector('#text');
const submit = document.querySelector('#submit');
const section = document.querySelector('#section');

const list = [];

submit.addEventListener('click', (e) => {
  e.preventDefault();
  let inputVal = text.value; 
  list.push(inputVal);
  const article = document.createElement('article');
  article.innerHTML = `<p>${inputVal}</p>
  <div class="btns">
    <button id="delete">Delete</button>
  </div>`
  section.appendChild(article);

  if(localStorage.length > 0) {
    const localData = JSON.parse(localStorage.getItem('list'));
    localData.push(inputVal);
    localStorage.setItem('list', JSON.stringify(localData));

  } else {
    localStorage.setItem('list', JSON.stringify(list));
  }
  text.value = '';

  //to tell the site "there is a btn name delete and does something"
  deleteItem();
});

// get the data from local storage and add it as a list
function getData() {
  const storageItems = JSON.parse(localStorage.getItem('list'));
  if(localStorage.length > 0) {
    for(let i=0; i<storageItems.length; i++){
      const article = document.createElement('article');
      let item = storageItems[i];
      article.innerHTML = `<p>${item}</p>
      <div class="btns">
        <button id="delete">Delete</button>
      </div>`;
      section.appendChild(article);
    }
  }
}
getData();

//delete item on click the delete btn
function deleteItem() {
  const deleteBtn = document.querySelectorAll('#delete');

  deleteBtn.forEach((element) => {
    element.addEventListener('click', (e) => {

      const item = e.currentTarget.parentElement.parentElement;
      const p = item.firstChild.innerHTML;
      const hello = JSON.parse(localStorage.getItem('list'));
      const index = hello.indexOf(p);
      if(index > -1) {hello.splice(index, 1)}
      localStorage.setItem('list', JSON.stringify(hello));
      item.remove();

    });
  });
}
deleteItem();
