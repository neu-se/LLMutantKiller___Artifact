import { Matcher } from "../../../../../../../src/matcher";

describe('Matcher', () => {
  it('should match strings correctly', () => {
    const matcher = new Matcher('/test');
    expect(matcher[Symbol.match]('test')).not.toBeNull();
    expect(matcher[Symbol.match]('test/')).toBeNull();
    const matcher2 = new Matcher('/test/');
    expect(() => new Matcher('/test/')).toThrowError('Path must not end with a slash');
  });
});