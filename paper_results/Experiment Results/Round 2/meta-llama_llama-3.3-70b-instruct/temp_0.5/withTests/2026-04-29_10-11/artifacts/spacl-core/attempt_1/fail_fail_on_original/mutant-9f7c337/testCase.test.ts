import { describe, it } from '@jest/globals';
import { Matcher } from '../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('rejects paths with malformed wildcards', () => {
    expect(() => Matcher.for('/[*+/')).toThrowError('Path contains malformed wildcards');
  });
});