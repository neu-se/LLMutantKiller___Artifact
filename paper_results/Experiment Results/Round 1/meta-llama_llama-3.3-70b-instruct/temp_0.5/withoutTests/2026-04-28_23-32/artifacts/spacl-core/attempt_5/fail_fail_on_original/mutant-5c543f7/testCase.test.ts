import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should correctly handle path specifications with captures', () => {
    expect(() => Matcher.for('/test:ab')).not.toThrowError('Path contains malformed captures');
    expect(() => Matcher.for('/test:abc')).not.toThrowError('Path contains malformed captures');
  });
});