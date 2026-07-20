import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should correctly handle the "any" quantifier in path specifications', () => {
    const matcher = Matcher.for('/a/*', '1.1');
    expect(matcher.test('a/b')).toBe(true);
    expect(matcher.test('a/b/c')).toBe(true);
    expect(matcher.test('a')).toBe(false);
  });
});