import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should create a matcher with default version', () => {
    const matcher = Matcher.for('/');
    expect(matcher).toBeInstanceOf(Matcher);
  });
});