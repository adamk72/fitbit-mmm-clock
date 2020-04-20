import document from 'document';

let btnTR = document.getElementById('btn-tr');
btnTR.onactivate = function (evt) {
  console.log(evt.target);
  console.log('TOP RIGHT!');
};
