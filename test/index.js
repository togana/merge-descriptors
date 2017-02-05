const assert = require('assert');
const merge = require('..');

describe('merge(dest, src)', () => {
  describe('arguments', () => {
    describe('dest', () => {
      it('should be required', () => {
        assert.throws(merge.bind(null, undefined), /^TypeError: dist is unexpected argument.$/);
      });

      it('should reject null', () => {
        assert.throws(merge.bind(null, null), /^TypeError: dist is unexpected argument.$/);
      });

      it('should reject empty string', () => {
        assert.throws(merge.bind(null, ''), /^TypeError: dist is unexpected argument.$/);
      });

      it('should reject 0', () => {
        assert.throws(merge.bind(null, 0), /^TypeError: dist is unexpected argument.$/);
      });
    });

    describe('src', () => {
      it('should be required', () => {
        assert.throws(merge.bind(null, {}, undefined), /^TypeError: src is unexpected argument.$/);
      });

      it('should reject null', () => {
        assert.throws(merge.bind(null, {}, null), /^TypeError: src is unexpected argument.$/);
      });

      it('should reject empty string', () => {
        assert.throws(merge.bind(null, {}, ''), /^TypeError: src is unexpected argument.$/);
      });

      it('should reject 0', () => {
        assert.throws(merge.bind(null, {}, 0), /^TypeError: src is unexpected argument.$/);
      });
    });
  });

  describe('when merging objects', () => {
    it('should copy property descriptors from src to dest', () => {
      const dest = {};
      const src = {};

      Object.defineProperty(src, 'name', {
        value: 'togana',
      });

      assert.ok(!hasOwnProperty.call(dest, 'name'));

      merge(dest, src);

      assert.ok(hasOwnProperty.call(dest, 'name'));
      assert.ok(Object.getOwnPropertyDescriptor(dest, 'name'));
      assert.equal(Object.getOwnPropertyDescriptor(dest, 'name').value, 'togana');
    });

    describe('when property exists in src', () => {
      it('should redefine when configurable', () => {
        const dest = {};
        const src = {};

        Object.defineProperty(dest, 'name', {
          configurable: true,
          value: 'togana',
        });

        Object.defineProperty(src, 'name', {
          value: 'oden',
        });

        assert.ok(hasOwnProperty.call(dest, 'name'));
        assert.equal(Object.getOwnPropertyDescriptor(dest, 'name').value, 'togana');
        assert.ok(hasOwnProperty.call(src, 'name'));
        assert.equal(Object.getOwnPropertyDescriptor(src, 'name').value, 'oden');

        merge(dest, src);

        assert.ok(hasOwnProperty.call(dest, 'name'));
        assert.ok(Object.getOwnPropertyDescriptor(dest, 'name'));
        assert.equal(Object.getOwnPropertyDescriptor(dest, 'name').value, 'oden');
      });

      it('should error when non-configurable', () => {
        const dest = {};
        const src = {};

        Object.defineProperty(dest, 'name', {
          configurable: false,
          value: 'togana',
        });

        Object.defineProperty(src, 'name', {
          value: 'oden',
        });

        assert.ok(hasOwnProperty.call(dest, 'name'));
        assert.equal(Object.getOwnPropertyDescriptor(dest, 'name').value, 'togana');
        assert.ok(hasOwnProperty.call(src, 'name'));
        assert.equal(Object.getOwnPropertyDescriptor(src, 'name').value, 'oden');

        assert.throws(merge.bind(null, dest, src), /TypeError: Cannot redefine property: name/);
      });

      it('should skip when redefine is false', () => {
        const dest = {};
        const src = {};

        Object.defineProperty(dest, 'name', {
          configurable: true,
          value: 'togana',
        });

        Object.defineProperty(src, 'name', {
          value: 'oden',
        });

        assert.ok(hasOwnProperty.call(dest, 'name'));
        assert.equal(Object.getOwnPropertyDescriptor(dest, 'name').value, 'togana');
        assert.ok(hasOwnProperty.call(src, 'name'));
        assert.equal(Object.getOwnPropertyDescriptor(src, 'name').value, 'oden');

        merge(dest, src, false);

        assert.ok(hasOwnProperty.call(dest, 'name'));
        assert.ok(Object.getOwnPropertyDescriptor(dest, 'name'));
        assert.equal(Object.getOwnPropertyDescriptor(dest, 'name').value, 'togana');
      });
    });
  });
});
