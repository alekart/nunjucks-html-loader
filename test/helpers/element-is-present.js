// eslint-disable-next-line import/no-extraneous-dependencies
import { JSDOM } from 'jsdom';

import readAsset from './readAsset';

/**
 * @param asset
 * @param compiler
 * @param stats
 * @returns {Document}
 */
export function loadDocument(asset, compiler, stats) {
  const assetData = readAsset(asset.replace(/njk$/, 'html'), compiler, stats) || '';
  return getDocument(assetData);
}

/**
 * @param html {string}
 * @returns {Document}
 */
export function getDocument(html) {
  return new JSDOM(html || '').window.document;
}

/**
 * @param selector{string}
 * @param html {string}
 */
export function elementIsPresent(selector, html) {
  const element = getElement(selector, html);
  return !!element;
}

/**
 * @param selector {string}
 * @param html {string | Document}
 * @returns {NodeList}
 */
export function getElements(selector, html) {
  const doc = typeof html === 'string'
    ? getDocument(html)
    : html;
  return doc.querySelectorAll(selector);
}

/**
 * @param selector {string}
 * @param html {string | Document}
 * @returns {HTMLElement | null}
 */
export function getElement(selector, html) {
  const doc = typeof html === 'string'
    ? getDocument(html)
    : html;
  return doc.querySelector(selector);
}
