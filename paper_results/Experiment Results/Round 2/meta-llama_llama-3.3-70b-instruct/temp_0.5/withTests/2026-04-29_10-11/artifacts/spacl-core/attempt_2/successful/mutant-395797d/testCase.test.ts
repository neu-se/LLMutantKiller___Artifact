import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('matcher', () => {
  it('rejects paths with empty segments', () => {
    const spec = '//';
    try {
      new Matcher(spec);
      throw new Error('Expected error to be thrown');
    } catch (error: any) {
      strictEqual(error.message, 'Path contains empty segments');
    }
  });
});