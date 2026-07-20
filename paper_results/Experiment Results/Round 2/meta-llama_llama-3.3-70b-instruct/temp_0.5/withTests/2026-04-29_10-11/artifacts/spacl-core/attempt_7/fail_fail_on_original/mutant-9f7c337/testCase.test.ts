import { describe, it } from '@jest/globals';
import { Matcher } from '../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('accepts paths with [*+] in the original code but rejects in the mutated code', () => {
    expect(() => Matcher.for('/[*+]')).not.toThrowError();
  });
});