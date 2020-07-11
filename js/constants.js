'use strict';
var PICTURES_AMOUNT = 25;
var RANDOM_PICTURES_AMOUNT = 10;
var PERCENT = 0.01;
var Filter = {
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
  ORIGIN: 'none'
};
var PHOBOS_MAX = 3;
var MARVIN_MAX = 100;
var HEAT_MAX = 3;

var DEFAULT_EFFECT_DEPTH = '100%';
var DEFAULT_EFFECT_PIN = '100%';
var HASHTAGS_MAX = 5;
var HASHTAGS_MAX_LENGTH = 20;
var hashTagsRegExp = /^#[a-zа-яA-ZА-Я0-9]*$/;
var Errors = {
  LOST_HASH: 'Хэштег должен начинаться с #!',
  ONLY_HASH: 'Хэштег не может быть только #!',
  WHITE_SPACE: 'Между хэштегами должен быть пробел!',
  FORBIDDEN_CHARACTERS: 'После # должны быть только буквы и числа. Нельзя использовать пробел, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д.!',
  TOO_LONG: 'Хэштег не может быть длинее 20 символов, включая #!',
  DUPLICATE: 'Один и тот же хэштег не может быть использован дважды!',
  TOO_MUCH: 'Нельзя указать больше пяти хэштегов!'
};
var Scale = {
  STEP: 25,
  MIN: 25,
  MAX: 100,
  INITIAL: 100
};
var URL_ADDRESS = {
  LOAD: 'https://javascript.pages.academy/kekstagram/data',
  SAVE: 'https://javascript.pages.academy/kekstagram'
};
var TIMEOUT = 10000;
var SUCCESS_STATUS_CODE = 200;
var DEBOUNCE_INTERVAL = 500;
var COMMENTS_AMOUNT = 5;

window.constants = {
  PICTURES_AMOUNT: PICTURES_AMOUNT,
  RANDOM_PICTURES_AMOUNT: RANDOM_PICTURES_AMOUNT,
  PERCENT: PERCENT,
  Filter: Filter,
  PHOBOS_MAX: PHOBOS_MAX,
  MARVIN_MAX: MARVIN_MAX,
  HEAT_MAX: HEAT_MAX,
  DEFAULT_EFFECT_DEPTH: DEFAULT_EFFECT_DEPTH,
  DEFAULT_EFFECT_PIN: DEFAULT_EFFECT_PIN,
  HASHTAGS_MAX: HASHTAGS_MAX,
  HASHTAGS_MAX_LENGTH: HASHTAGS_MAX_LENGTH,
  hashTagsRegExp: hashTagsRegExp,
  Errors: Errors,
  Scale: Scale,
  LOAD: URL_ADDRESS.LOAD,
  SAVE: URL_ADDRESS.SAVE,
  TIMEOUT: TIMEOUT,
  SUCCESS_STATUS_CODE: SUCCESS_STATUS_CODE,
  DEBOUNCE_INTERVAL: DEBOUNCE_INTERVAL,
  COMMENTS_AMOUNT: COMMENTS_AMOUNT
};
