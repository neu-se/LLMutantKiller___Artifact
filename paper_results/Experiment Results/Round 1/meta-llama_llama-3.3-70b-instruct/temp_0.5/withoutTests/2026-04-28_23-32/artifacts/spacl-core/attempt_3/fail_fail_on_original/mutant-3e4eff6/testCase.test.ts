import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should correctly handle the "any" quantifier in path specifications', () => {
    const matcher = Matcher.for('/a/*', '1.1');
    expect(matcher.test('a')).toBe(false);
    expect(matcher.test('a/')).toBe(null);
    expect(matcher.test('a/b')).toBe(null);
  });
});