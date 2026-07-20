import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';

describe('Matcher', () => {
  it('accepts valid paths', () => {
    const spec = '/+/+';
    const matcher = Matcher.for(spec);
    expect(matcher.spec).toBe(spec);
  });
});