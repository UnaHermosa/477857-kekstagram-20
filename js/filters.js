'use strict';
(function () {
  var util = window.util;
  var pictures = window.pictures;
  var variables = window.variables;
  var debounce = window.debounce;

  var filterDefault = document.querySelector('#filter-default');
  var filterRandom = document.querySelector('#filter-random');
  var filterDiscussed = document.querySelector('#filter-discussed');

  filterDefault.addEventListener('click', debounce(function () {
    document.querySelectorAll('.picture').forEach(function (item) {
      item.remove();
    });
    filterDefault.classList.add('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    pictures.renderPhoto(pictures.getLoadedData(), variables.PICTURES_AMOUNT);
  }));

  filterRandom.addEventListener('click', debounce(function () {
    document.querySelectorAll('.picture').forEach(function (item) {
      item.remove();
    });
    filterDefault.classList.remove('img-filters__button--active');
    filterRandom.classList.add('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    pictures.renderPhoto(util.shuffleArray(pictures.getLoadedData()).slice(0, variables.RANDOM_PICTURES_AMOUNT));
  }));

  filterDiscussed.addEventListener('click', debounce(function () {
    document.querySelectorAll('.picture').forEach(function (item) {
      item.remove();
    });
    filterDefault.classList.remove('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    filterDiscussed.classList.add('img-filters__button--active');
    pictures.renderPhoto(util.sortObjectsArrayByField(pictures.getLoadedData(), 'comments'));
  }));
}());
