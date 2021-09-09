export default class TellActions {
  constructor() {
    this.counter = 0;
  }
  tell(action) {
    this.counter++;
    let table = document.querySelector("#tableActions");
    let row = table.insertRow(-1);
    let colAction = row.insertCell(-1);
    row.setAttribute("id", `row${this.counter}`);
    colAction.setAttribute("id", `colAct${this.counter}`);
    colAction.innerHTML = action;
  }
}
