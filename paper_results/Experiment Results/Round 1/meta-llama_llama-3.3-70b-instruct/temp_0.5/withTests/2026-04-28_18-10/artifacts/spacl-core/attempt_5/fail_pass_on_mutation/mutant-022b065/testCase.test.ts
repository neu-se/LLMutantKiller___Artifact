import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('Matcher', () => {
  it('should reject a path that starts with a slash and has one or more characters and then ends with a slash', () => {
    const spec = '/a/';
    try {
      new Matcher(spec);
      strictEqual(true, false, `Expected Matcher to throw an error for spec '${spec}'`);
    } catch (error) {
      strictEqual(error.message, 'Path must not end with a slash');
    }
    const spec2 = '/a';
    try {
      const matcher = new Matcher(spec2);
      strictEqual(matcher.spec, spec2);
    } catch (error) {
      strictEqual(true, false, `Expected Matcher to not throw an error for spec '${spec2}'`);
    }
    const spec3 = '/aa/';
    try {
      new Matcher(spec3);
      strictEqual(true, false, `Expected Matcher to throw an error for spec '${spec3}'`);
    } catch (error) {
      strictEqual(error.message, 'Path must not end with a slash');
    }
    const spec4 = '/a/b/';
    try {
      new Matcher(spec4);
      strictEqual(true, false, `Expected Matcher to throw an error for spec '${spec4}'`);
    } catch (error) {
      strictEqual(error.message, 'Path must not end with a slash');
    }
    const spec5 = '/abcde/';
    try {
      new Matcher(spec5);
      strictEqual(true, false, `Expected Matcher to throw an error for spec '${spec5}'`);
    } catch (error) {
      strictEqual(error.message, 'Path must not end with a slash');
    }
    const spec6 = '/abcdef/';
    try {
      new Matcher(spec6);
      strictEqual(true, false, `Expected Matcher to throw an error for spec '${spec6}'`);
    } catch (error) {
      strictEqual(error.message, 'Path must not end with a slash');
    }
    const spec7 = '/a/b/c/d/e/f/g/';
    try {
      new Matcher(spec7);
      strictEqual(true, false, `Expected Matcher to throw an error for spec '${spec7}'`);
    } catch (error) {
      strictEqual(error.message, 'Path must not end with a slash');
    }
  });
});