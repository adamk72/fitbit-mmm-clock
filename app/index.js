import document from 'document';
import * as buttons from './buttons';

buttons.marshmallow.onactivate = function (evt) {
  console.log(evt.target);
  console.log('TOP RIGHT!');
};
