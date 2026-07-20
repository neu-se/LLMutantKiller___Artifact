import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('matcher', () => {
  it('should throw an error for a path that ends with a slash', () => {
    const spec = '/foo/';
    try {
      new Matcher(spec);
      strictEqual(true, false, 'Expected an error to be thrown');
    } catch (error) {
      strictEqual(error.message, 'Path must not end with a slash');
    }
  });
});