import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should correctly handle path specifications with named captures', () => {
    const matcher = Matcher.for('/path/to/:param');
    expect(matcher.props).toEqual(['param']);

    const matcherWithShortNamedCapture = Matcher.for('/path/to/:a');
    expect(matcherWithShortNamedCapture.props).toEqual(['a']);

    const matcherWithLongNamedCapture = Matcher.for('/path/to/:longNamedCapture');
    expect(matcherWithLongNamedCapture.props).toEqual(['longNamedCapture']);
  });
});