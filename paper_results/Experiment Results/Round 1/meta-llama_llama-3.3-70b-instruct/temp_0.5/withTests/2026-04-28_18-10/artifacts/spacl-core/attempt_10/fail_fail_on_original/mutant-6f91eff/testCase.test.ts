import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('matcher', () => {
  it('accepts paths with valid wildcards', () => {
    const spec = '/a*b';
    try {
      new Matcher(spec, '1');
    } catch (err: any) {
      throw new Error(`unexpected error: ${err.message}`);
    }
    strictEqual(true, true);
  });
});