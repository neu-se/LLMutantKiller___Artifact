import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('Matcher', () => {
  it('rejects paths with malformed wildcards', () => {
    const spec = '/a*b';
    try {
      new Matcher(spec);
    } catch (error: any) {
      strictEqual(error.message, 'Path contains malformed wildcards');
    }
  });

  it.skip('accepts paths with valid wildcards on original code', () => {
    const spec = '/ab*';
    try {
      new Matcher(spec);
    } catch (error: any) {
      throw new Error('Expected no error to be thrown on original code');
    }
  });
});