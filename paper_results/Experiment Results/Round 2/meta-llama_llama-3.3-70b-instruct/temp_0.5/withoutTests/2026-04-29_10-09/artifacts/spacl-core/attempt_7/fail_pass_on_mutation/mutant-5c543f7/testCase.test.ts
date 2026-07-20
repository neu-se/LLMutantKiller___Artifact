import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should correctly handle path specifications with named captures', () => {
    const matcher = Matcher.for('/path/to/:abc');
    expect(matcher.props).toEqual(['abc']);

    const matcherWithShortNamedCapture = Matcher.for('/path/to/:a');
    expect(matcherWithShortNamedCapture.props).toEqual(['a']);

    expect(() => {
      const matcherWithInvalidNamedCapture = Matcher.for('/path/to/:');
      expect(matcherWithInvalidNamedCapture.props).toEqual(['']); // This should fail on the mutated code
    }).toThrowError('Path contains malformed captures');
  });
});