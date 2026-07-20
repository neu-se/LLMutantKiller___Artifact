import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should correctly handle path specifications with captures', () => {
    const matcher = Matcher.for('/test:a');
    expect(matcher.props).toEqual(['a']);
    expect(() => Matcher.for('/test:ab')).toThrowError('Path contains malformed captures');
  });
});