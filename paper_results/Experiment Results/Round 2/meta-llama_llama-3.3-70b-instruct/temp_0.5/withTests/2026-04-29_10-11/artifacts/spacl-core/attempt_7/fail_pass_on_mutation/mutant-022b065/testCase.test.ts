import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('matcher', () => {
  it('should create a matcher for a path that does not end with a slash', () => {
    const spec = '/foo';
    const matcher = new Matcher(spec);
    strictEqual(matcher.spec, spec);
    try {
      const invalidSpec = '/foo/';
      new Matcher(invalidSpec);
      strictEqual(true, false, 'Expected an error to be thrown');
    } catch (error) {
      strictEqual(error.message, 'Path must not end with a slash');
    }
  });
});