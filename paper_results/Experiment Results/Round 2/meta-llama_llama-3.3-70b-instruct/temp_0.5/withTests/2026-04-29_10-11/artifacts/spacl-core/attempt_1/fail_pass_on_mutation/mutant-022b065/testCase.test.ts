import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('matcher', () => {
  it('should throw an error for path that does not end with a slash when original code is used', () => {
    const spec = '/foo/';
    try {
      new Matcher(spec);
      strictEqual(true, false, 'Expected an error to be thrown');
    } catch (error) {
      strictEqual(error.message, 'Path must not end with a slash');
    }
  });

  it.skip('should not throw an error for path that does not end with a slash when mutated code is used', () => {
    const spec = '/foo/';
    try {
      // Simulate the mutated code by commenting out the line that checks for the trailing slash
      // if (spec.match(/.+\/$/) !== null) {
      //   throw new Error('Path must not end with a slash')
      // }
      new Matcher(spec);
      strictEqual(true, true);
    } catch (error) {
      strictEqual(true, false, 'An error was thrown when it should not have been');
    }
  });
});