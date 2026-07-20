import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';

describe('matcher', () => {
  it('accepts paths with valid wildcards', () => {
    expect(() => Matcher.for('/[*+][^/]')).toThrowError('Path contains malformed wildcards');
  });
});