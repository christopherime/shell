"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadMerge = exports.load = void 0;
const yaml = require("js-yaml");
const fs = require("fs");
const lodash = require("lodash");
/**
 * Loads and returns the contents of the given file as YAML. The passed file
 * is assumed to be UTF-8 encoded.
 */
function load(filename) {
    if (!fs.existsSync(filename)) {
        console.error(`file ${filename} does not exist.`);
        return undefined;
    }
    const fileContents = fs.readFileSync(filename, { encoding: 'utf8' });
    return yaml.safeLoad(fileContents, { filename });
}
exports.load = load;
/**
 * Loads and returns the contents of the given files as a single YAML object.
 * Files are merged with increasing priority, meaning that files having a
 * higher index in the passed array override those with a lower index.
 */
function loadMerge(filenames) {
    let mergedValues = {};
    for (const filename of filenames) {
        const values = load(filename);
        if (values !== undefined) {
            mergedValues = lodash.merge(mergedValues, values);
        }
    }
    return mergedValues;
}
exports.loadMerge = loadMerge;
//# sourceMappingURL=yaml.js.map