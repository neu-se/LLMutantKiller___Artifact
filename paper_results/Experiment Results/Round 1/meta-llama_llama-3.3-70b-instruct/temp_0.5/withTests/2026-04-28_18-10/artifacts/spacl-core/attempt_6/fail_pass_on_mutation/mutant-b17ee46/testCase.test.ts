import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';

describe('Matcher', () => {
  it('should create a new matcher with default version', () => {
    const spec = '/';
    const matcher1 = Matcher.for(spec);
    const matcher2 = Matcher.for(spec, '1.1');
    expect(matcher1.spec).toBe(matcher2.spec);
  });
});