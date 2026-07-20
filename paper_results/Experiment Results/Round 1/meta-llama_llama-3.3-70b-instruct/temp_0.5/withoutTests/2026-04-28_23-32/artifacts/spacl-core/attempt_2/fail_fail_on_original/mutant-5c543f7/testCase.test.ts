import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should correctly handle path specifications with captures', () => {
    const matcher = Matcher.for('/test:abc');
    expect(matcher.props).toEqual(['abc']);
    const matcher2 = Matcher.for('/test:a');
    expect(matcher2.props).toEqual(['a']);
  });
});