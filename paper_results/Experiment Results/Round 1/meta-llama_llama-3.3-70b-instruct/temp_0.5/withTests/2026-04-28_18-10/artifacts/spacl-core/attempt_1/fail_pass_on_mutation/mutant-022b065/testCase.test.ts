import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('Matcher', () => {
  it('should reject paths with trailing slashes', () => {
    const spec = '/foo/';
    try {
      new Matcher(spec);
      strictEqual(true, false, `Expected Matcher to throw an error for spec '${spec}'`);
    } catch (error) {
      strictEqual(error.message, 'Path must not end with a slash');
    }
  });
});