import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('matcher', () => {
  it('should throw an error for a path that ends with a slash when the path is checked against the original regex', () => {
    const spec = '/foo/';
    const originalRegex = /^.+\/$/;
    try {
      if (spec.match(originalRegex) !== null) {
        throw new Error('Path must not end with a slash');
      }
      new Matcher(spec);
      strictEqual(true, false, 'Expected an error to be thrown');
    } catch (error) {
      strictEqual(error.message, 'Path must not end with a slash');
    }
    try {
      const mutatedRegex = /.+\/$/;
      if (spec.match(mutatedRegex) !== null) {
        // This should not throw an error in the mutated code
        new Matcher(spec);
        strictEqual(true, false, 'Expected no error to be thrown');
      }
    } catch (error) {
      strictEqual(true, false, 'An error was thrown when it should not have been');
    }
  });
});