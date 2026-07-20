import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should create a new Matcher with default version', () => {
    const matcher = Matcher.for('/');
    expect(matcher).toBeInstanceOf(Matcher);
  });
});