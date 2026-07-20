import { describe, it } from '@jest/globals';
import { Matcher } from '../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('accepts paths with valid wildcards', () => {
    expect(() => Matcher.for('/+')).not.toThrowError();
    expect(() => Matcher.for('/*')).not.toThrowError();
    expect(() => Matcher.for('/**')).not.toThrowError();
    expect(() => Matcher.for('/++')).not.toThrowError();
  });
});