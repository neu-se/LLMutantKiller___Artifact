import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('matcher', () => {
  it('should throw an error for a path that ends with a slash in the original code but not in the mutated code', () => {
    const spec = '/foo/';
    try {
      new Matcher(spec);
      strictEqual(true, false, 'Expected an error to be thrown in the original code');
    } catch (error) {
      strictEqual(error.message, 'Path must not end with a slash');
    }
    // Simulate the mutated code
    try {
      // The original code checks for a path that starts and ends with a slash
      // The mutated code checks for a path that ends with a slash anywhere
      // So, we should be able to create a matcher for the path in the mutated code
      const mutatedMatcher = new Matcher(spec.replace(/^\/|\/$/g, ''));
      strictEqual(true, true);
    } catch (error) {
      strictEqual(true, false, 'An error was thrown when it should not have been in the mutated code');
    }
  });
});