import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('matcher', () => {
  it('accepts paths with valid wildcards', () => {
    const spec = '/a*b';
    try {
      new Matcher(spec);
      strictEqual(true, false, `expected path spec '${spec}' to be rejected`);
    } catch (err: any) {
      strictEqual(true, false, `unexpected error: ${err.message}`);
    }
  });
});