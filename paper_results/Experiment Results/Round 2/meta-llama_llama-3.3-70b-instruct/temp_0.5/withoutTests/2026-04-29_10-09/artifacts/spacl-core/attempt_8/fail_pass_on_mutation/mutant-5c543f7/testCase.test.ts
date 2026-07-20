import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should correctly handle path specifications with named captures', () => {
    const matcher = Matcher.for('/path/to/:a');
    expect(matcher.props).toEqual(['a']);

    const matcherWithNamedCapture = Matcher.for('/path/to/:ab');
    expect(matcherWithNamedCapture.props).toEqual(['ab']);

    const matcherWithShortNamedCapture = Matcher.for('/path/to/:abc');
    expect(matcherWithShortNamedCapture.props).toEqual(['abc']);

    expect(() => {
      const matcherWithInvalidNamedCapture = Matcher.for('/path/to/:');
      expect(matcherWithInvalidNamedCapture.props).toThrowError('Path contains malformed captures');
    }).toThrowError('Path contains malformed captures');
  });
});