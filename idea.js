class Idea {u
  constructor(title, body, id, quality, starred) {
    this.title = title;
    this.body = body;
    this.id = id || Date.now();
    this.quality = quality || 'Swill';
    this.starred = starred;
  }

  saveToStorage(heels) {
    var stringThing = JSON.stringify(this);
    console.log(this);
    localStorage.setItem(this.id, stringThing);
  }

  deleteFromStorage() {
    localStorage.removeItem(this.id);
  }

  updateIdea(text, type) {
    if (type == 'title') {
      this.title = text
    }
    else if (type == 'body') {
      this.body = text
    }
    var stringThing = JSON.stringify(this);
    localStorage.setItem(this.id, stringThing);
  }

  updateQuality() {
    var stringThing = JSON.stringify(this);
    localStorage.setItem(this.id, stringThing);
  }

}



