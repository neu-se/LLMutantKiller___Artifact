import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should correctly handle path specifications with named captures', () => {
    const matcher = Matcher.for('/path/to/:a');
    expect(matcher.props).toEqual(['a']);

    const matcherWithNamedCapture = Matcher.for('/path/to/:ab');
    expect(matcherWithNamedCapture.props).toEqual(['ab']);

    const matcherWithSingleCharacterNamedCapture = Matcher.for('/path/to/:x');
    expect(matcherWithSingleCharacterNamedCapture.props).toEqual(['x']);

    const matcherWithShortNamedCapture = Matcher.for('/path/to/:abc');
    expect(matcherWithShortNamedCapture.props).toEqual(['abc']);
  });
});