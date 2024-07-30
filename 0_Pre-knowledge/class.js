class Person {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
  setName(name) {
    this.name = name;
  }
}

var person = new Person("SRIGT");
console.log(person.getName()); // "SRIGT"
person.setName("SR1GT");
console.log(person.getName()); // "SR1GT"
