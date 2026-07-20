import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('Matcher', () => {
  it('rejects paths with malformed wildcards', () => {
    const spec = '/a*b';
    try {
      new Matcher(spec);
      throw new Error('Expected error to be thrown on original code');
    } catch (error: any) {
      strictEqual(error.message, 'Path contains malformed wildcards');
    }
  });

  it.skip('accepts paths with valid wildcards', () => {
    const spec = '/a*b';
    const matcher = new Matcher(spec);
    strictEqual(matcher.spec, spec);
  });
});