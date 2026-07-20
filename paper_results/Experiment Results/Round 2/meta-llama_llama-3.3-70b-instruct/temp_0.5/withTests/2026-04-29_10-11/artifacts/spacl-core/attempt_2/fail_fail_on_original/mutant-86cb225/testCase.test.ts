import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('Matcher', () => {
  it('rejects paths with malformed wildcards', () => {
    const spec = '/[*+][^/]|[^/][*+]';
    try {
      new Matcher(spec);
      throw new Error('Expected error to be thrown');
    } catch (error: any) {
      strictEqual(error.message, 'Path contains malformed wildcards');
    }
  });
});