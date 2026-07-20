import { Matcher } from '../../../matcher';

describe('Matcher', () => {
  it('should correctly handle path specifications with captures', () => {
    const matcher = Matcher.for('/test:capture');
    expect(matcher.props).toEqual(['capture']);
  });
});