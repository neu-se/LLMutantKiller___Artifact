import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should correctly handle path specifications with named captures', () => {
    const matcher = Matcher.for('/path/to/:a');
    expect(matcher.props).toEqual(['a']);

    const matcherWithNamedCapture = Matcher.for('/path/to/:abc');
    expect(matcherWithNamedCapture.props).toEqual(['abc']);

    const matcherWithShortNamedCapture = Matcher.for('/path/to/:x');
    expect(matcherWithShortNamedCapture.props).toEqual(['x']);
  });
});