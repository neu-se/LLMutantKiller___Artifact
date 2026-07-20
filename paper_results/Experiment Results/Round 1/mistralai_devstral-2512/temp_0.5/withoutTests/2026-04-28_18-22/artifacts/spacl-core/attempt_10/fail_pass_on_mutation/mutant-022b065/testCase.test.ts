import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher constructor', () => {
  it('should accept path "/" without throwing error', () => {
    const matcher = new Matcher('/');
    expect(matcher.spec).toBe('/');
    expect(matcher.test('/')).toBe(true);
  });
});