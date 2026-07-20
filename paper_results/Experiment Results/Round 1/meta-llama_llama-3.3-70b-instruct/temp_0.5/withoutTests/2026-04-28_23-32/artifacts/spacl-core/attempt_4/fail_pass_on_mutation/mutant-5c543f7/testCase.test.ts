import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should correctly handle path specifications with captures', () => {
    expect(() => Matcher.for('/test:a')).toThrowError('Path contains malformed captures');
    expect(() => Matcher.for('/test:abc')).toThrowError('Path contains malformed captures');
  });
});