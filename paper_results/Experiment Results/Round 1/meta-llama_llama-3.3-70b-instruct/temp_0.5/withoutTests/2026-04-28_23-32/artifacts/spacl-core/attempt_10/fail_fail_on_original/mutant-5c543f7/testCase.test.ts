import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should correctly handle path specifications with captures', () => {
    const matcher = Matcher.for('/test:a');
    expect(matcher.props).toEqual(['a']);
    try {
      const matcher2 = Matcher.for('/test:ab');
      expect(matcher2.props).not.toEqual(['ab']);
    } catch (error) {
      expect(error.message).toBe('Path contains malformed captures');
    }
  });
});