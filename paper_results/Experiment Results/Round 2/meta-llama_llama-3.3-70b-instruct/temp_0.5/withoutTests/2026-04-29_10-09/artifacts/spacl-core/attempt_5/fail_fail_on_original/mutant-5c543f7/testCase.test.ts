import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should correctly handle path specifications with named captures', () => {
    const matcher = Matcher.for('/path/to/:a');
    expect(matcher.props).toEqual(['a']);

    const matcherWithSingleCharacterNamedCapture = Matcher.for('/path/to/:x');
    expect(matcherWithSingleCharacterNamedCapture.props).toEqual(['x']);

    const matcherWithEmptyNamedCapture = Matcher.for('/path/to/:');
    expect(matcherWithEmptyNamedCapture.props).toEqual([]); // This should fail on the mutated code
  });
});