import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';

describe('matcher', () => {
  it('accepts paths with valid characters', () => {
    expect(() => Matcher.for('/+')).not.toThrowError();
    expect(() => Matcher.for('/*')).not.toThrowError();
  });
});