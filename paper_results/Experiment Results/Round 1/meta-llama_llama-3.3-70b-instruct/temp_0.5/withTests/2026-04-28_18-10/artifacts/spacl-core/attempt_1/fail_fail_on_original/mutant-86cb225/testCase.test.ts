import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it, expect } from '@jest/globals';

describe('Matcher', () => {
  it('should detect the mutation in the Matcher class', () => {
    const originalMatcher = new Matcher('/+*', '1.1');
    expect(() => originalMatcher).toThrowError('Path contains malformed wildcards');

    const mutatedMatcher = new Matcher('/+*', '1.1');
    // The mutated code should not throw an error here
    expect(() => mutatedMatcher).not.toThrowError();
  });
});