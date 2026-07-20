import { Matcher } from "../../../../../src/matcher";

describe('Matcher', () => {
  it('should match strings correctly', () => {
    const matcher = new Matcher('/test');
    const result = matcher[Symbol.match]('test');
    if (result) {
      expect(result.index).toBe(0);
    } else {
      expect(result).not.toBeNull();
    }
    expect(matcher[Symbol.match]('test/')).toBeNull();
  });
});