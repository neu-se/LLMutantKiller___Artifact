import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should use the default version when not provided', () => {
    const matcher = Matcher.for('/');
    expect(matcher.spec).toBe('/');
    expect(matcher.props).toEqual([]);
    const matcher2 = Matcher.for('/', '1.1');
    expect(matcher2.spec).toBe('/');
    expect(matcher2.props).toEqual([]);
    expect(() => Matcher.for('/', '1.2')).toThrowError('Path contains invalid characters');
  });
});