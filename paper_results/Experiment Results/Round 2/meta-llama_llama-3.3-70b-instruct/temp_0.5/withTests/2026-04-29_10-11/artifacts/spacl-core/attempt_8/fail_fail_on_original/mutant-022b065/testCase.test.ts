import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('matcher', () => {
  it('should throw an error when trying to create a matcher for a path that ends with a slash in the original code but not in the mutated code', () => {
    const spec = '/foo/';
    try {
      new Matcher(spec);
      strictEqual(true, false, 'Expected an error to be thrown in the original code');
    } catch (error) {
      strictEqual(error.message, 'Path must not end with a slash');
    }
    // Simulate the mutated code
    const mutatedSpec = '/foo/';
    try {
      new Matcher(mutatedSpec);
      strictEqual(true, false, 'Expected an error to be thrown in the mutated code');
    } catch (error) {
      strictEqual(true, false, 'An error was thrown when it should not have been in the mutated code');
    }
  });
});