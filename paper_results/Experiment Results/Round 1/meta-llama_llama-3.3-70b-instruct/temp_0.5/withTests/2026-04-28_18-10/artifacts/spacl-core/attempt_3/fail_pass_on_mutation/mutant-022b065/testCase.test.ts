import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('Matcher', () => {
  it('should accept a path that does not end with a slash', () => {
    const spec = '/foo/bar';
    try {
      const matcher = new Matcher(spec);
      strictEqual(matcher.spec, spec);
    } catch (error) {
      strictEqual(true, false, `Expected Matcher to not throw an error for spec '${spec}'`);
    }
  });
});