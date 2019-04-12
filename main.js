// *******Global Variables*********

var title = document.querySelector('.title-input');
var body = document.querySelector('.body-input');
var saveBtn = document.querySelector('.save-btn');
var ideasArray = [];
var numCards = 0;
var cardBookmark = document.querySelector('.card-area');
var myEnter = document.querySelector('.editable');

for (var i = 0; i < localStorage.length; i++) {
  var key = localStorage.key(i);
  var value = localStorage[key];
  var parsedIdea = JSON.parse(value);
  ideasArray.push(parsedIdea);
}



// *******Event Listeners**********
window.addEventListener('load', windowLoad(ideasArray));

saveBtn.addEventListener('click', addCard);

cardBookmark.addEventListener('click', function(e) {
  if (e.target.className.includes('delete-btn')) {
    deleteCard(e);
  }
});

cardBookmark.addEventListener('click', function(e) {
  if (e.target.className.includes('card-title')) {
    updateTitleContent(e);
  }
})

cardBookmark.addEventListener('click', function(e) {
  if (e.target.className.includes('card-body')) {
    updateBodyContent(e);
  }
})

cardBookmark.addEventListener('keydown', returnKey);



// *******Functions****************

function windowLoad(storageArray) {
  storageArray.forEach(function(x) {
    var idea = new Idea(x.title, x.body, x.id, x.quality);
    makeCard(idea);
  })
}


function addCard(e) {
  e.preventDefault();
  var idea = new Idea(title.value, body.value);
  ideasArray.push(idea);
  idea.saveToStorage(ideasArray);
  console.log(ideasArray);
  makeCard(idea);
  title.value = "";
  body.value = "";
  title.focus();
};

function makeCard(idea) {
  numCards++;
  var card = 

`<article class="idea-card" id="card${idea.id}">
        <div class="card-header">
          <input type="image" class="btns" src="assets/star.svg">
          <input type="image" data-deleteid=${idea.id} class=" delete-btn btns" src="assets/delete.svg">
        </div>
        <div class="card-main">
          <p class="card-title editable" data-editcontent=${idea.id} data-edittitle=${idea.title}>${idea.title}</p>
          <p class="card-body editable" data-editcontent=${idea.id} data-editbody=${idea.body}>${idea.body}</p>
        </div>
        <footer class="card-footer">
          <input type="image" class="up-vote btns" src="assets/upvote.svg">
          <h6 class="card-quality">Quality: <span class="vote">${idea.quality}</span></h6>
          <input type="image" class="down-vote btns" src="assets/downvote.svg">
        </footer>
      </article>`
      cardBookmark.insertAdjacentHTML('afterbegin', card);
};

function deleteCard(e) {
  e.preventDefault();
  var findId = e.target.dataset.deleteid;
  var data = document.querySelector(`#card${findId}`);
  data.remove();

  var idea = localStorage.getItem(findId);
  var ideaObject = JSON.parse(idea);
  var newIdea = new Idea(ideaObject.title, ideaObject.body, ideaObject.id, ideaObject.quality);

  newIdea.deleteFromStorage();

};

// *************Update Content Functions************

function returnKey(e) {
  if (e.keyCode === 13 && e.target.className.includes('card-title')){
    updateTitleContent(e);
  }
  
  if (e.keyCode === 13 && e.target.className.includes('card-body')) {
    updateBodyContent(e);

  }
};

function updateTitleContent(e){
  e.preventDefault()
  var findId = e.target.dataset.editcontent;
  var newTitle = e.target.dataset.edittitle;

  var idea = localStorage.getItem(findId);
  var ideaObject = JSON.parse(idea);
  var newIdea = new Idea(newTitle, ideaObject.body, ideaObject.id, ideaObject.quality);


  if (e.target.classList.contains('editable')) {
    e.target.contentEditable = true;
    newIdea.updateIdea(e.target.innerText, 'title');
  }
};

function updateBodyContent(e) {
  e.preventDefault();
  var findId = e.target.dataset.editcontent;
  var newBody = e.target.dataset.editbody;

  var idea = localStorage.getItem(findId);
  var ideaObject = JSON.parse(idea);
  var newIdea = new Idea(ideaObject.title, newBody, ideaObject.id, ideaObject.quality);

  if (e.target.classList.contains('editable')) {
    e.target.contentEditable = true;
    newIdea.updateIdea(e.target.innerText, 'body');
  }
};
