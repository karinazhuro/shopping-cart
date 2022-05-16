import Row from "./row.js";
import Model from './model.js';
import View from './view.js';
import Controller from './controller.js';

const row = new Row();
const model = new Model();
const view = new View(row);
const controller = new Controller(model, view);

document.addEventListener('DOMContentLoaded', () => controller);