import { Matcher } from "../../../src/matcher";

describe('Matcher', () => {
  it('should match strings correctly', () => {
    const matcher = new Matcher('/test');
    expect(matcher[Symbol.match]('test')).not.toBeNull();
    expect(matcher[Symbol.match]('test/')).toBeNull();
  });
});