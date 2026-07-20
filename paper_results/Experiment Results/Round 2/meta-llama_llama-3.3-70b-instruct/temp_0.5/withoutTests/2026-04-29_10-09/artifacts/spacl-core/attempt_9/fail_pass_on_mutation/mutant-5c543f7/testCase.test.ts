import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should correctly handle path specifications with named captures', () => {
    const matcher = Matcher.for('/path/to/:a');
    expect(matcher.props).toEqual(['a']);

    const matcherWithNamedCapture = Matcher.for('/path/to/:ab');
    expect(matcherWithNamedCapture.props).toEqual(['ab']);

    expect(() => {
      const matcherWithInvalidNamedCapture = Matcher.for('/path/to/:');
    }).toThrowError('Path contains malformed captures');

    const matcherWithValidNamedCapture = Matcher.for('/path/to/:abc');
    expect(matcherWithValidNamedCapture.props).toEqual(['abc']);
  });
});