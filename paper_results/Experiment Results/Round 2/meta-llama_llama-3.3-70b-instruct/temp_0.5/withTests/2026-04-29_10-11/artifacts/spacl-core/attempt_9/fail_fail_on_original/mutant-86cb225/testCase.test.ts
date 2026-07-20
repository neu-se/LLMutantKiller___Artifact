import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('Matcher', () => {
  it('accepts paths with valid wildcards', () => {
    const spec = '/+b';
    try {
      new Matcher(spec);
    } catch (error: any) {
      throw new Error('Expected no error to be thrown on original code');
    }
    // test the behavior of the mutated code
    try {
      new Matcher(spec);
      throw new Error('Expected error to be thrown on mutated code');
    } catch (error: any) {
      strictEqual(error.message, 'Path contains malformed wildcards');
    }
  });
});