import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should correctly handle path specifications with named captures', () => {
    const matcher = Matcher.for('/path/to/:a');
    expect(matcher.props).toEqual(['a']);

    expect(() => Matcher.for('/path/to/:')).toThrowError('Path contains malformed captures');
  });
});