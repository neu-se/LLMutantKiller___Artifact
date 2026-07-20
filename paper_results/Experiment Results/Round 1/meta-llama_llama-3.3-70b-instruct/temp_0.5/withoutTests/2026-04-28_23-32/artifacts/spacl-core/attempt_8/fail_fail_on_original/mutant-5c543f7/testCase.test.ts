import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should correctly handle path specifications with captures', () => {
    expect(() => Matcher.for('/test:a')).not.toThrowError('Path contains malformed captures');
    const matcher = Matcher.for('/test:a');
    expect(matcher.props).toEqual(['a']);
  });
});