import { Matcher } from "../../../../../src/matcher";

describe('Matcher', () => {
  it('should match strings correctly', () => {
    const matcher = new Matcher('/test');
    const result = matcher[Symbol.match]('test');
    expect(result).not.toBeNull();
    expect(result!.index).toBe(0);
  });
});