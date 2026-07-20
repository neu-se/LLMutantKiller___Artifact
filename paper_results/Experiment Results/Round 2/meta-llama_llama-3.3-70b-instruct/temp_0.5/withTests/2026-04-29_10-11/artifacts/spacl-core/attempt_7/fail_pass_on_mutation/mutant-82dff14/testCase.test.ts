import { describe, it, expect } from '@jest/globals';
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher constructor', () => {
  it('should have a default version of "1.1"', () => {
    const matcher = new Matcher('/', undefined);
    expect(matcher).toBeInstanceOf(Matcher);
    expect(matcher.spec).toBeDefined();
    expect(matcher.props).toBeDefined();
  });
});