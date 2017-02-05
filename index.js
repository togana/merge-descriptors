/**
 * merge-descriptors
 */

/**
 * Merge the property descriptors of `src` into `dest`
 *
 * @param {Object} dest - Object to add descriptors to
 * @param {Object} src - Object to clone descriptors from
 * @param {Boolean} [redefine=true] - Redefine `dest` properties with `src` properties
 * @return {Object} - Reference to dest
 * @public
 *
 * @example
 * const src = { get name() { return 'togana'; } };
 * const dest = {};
 * merge(dest, src);
 * // dest.name = 'togana'
 */
function merge(dest, src, redefine = true) {
  if (!dest) throw new TypeError('dist is unexpected argument.');
  if (!src) throw new TypeError('src is unexpected argument.');

  Object.getOwnPropertyNames(src)
    .filter(name => redefine || !(name in dest))
    .map(name => Object.defineProperty(dest, name, Object.getOwnPropertyDescriptor(src, name)));

  return dest;
}

/**
 * Module exports.
 *
 * @public
 */
module.exports = merge;
