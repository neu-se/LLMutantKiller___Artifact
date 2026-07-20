import { Matcher } from "../../../../../../../src/matcher";

describe('Matcher', () => {
  it('should match strings correctly', () => {
    const matcher = new Matcher('/test');
    expect(matcher[Symbol.match]('test')).not.toBeNull();
    expect(matcher[Symbol.match]('test/')).toBeNull();
    const matcher2 = new Matcher('/test');
    expect(matcher2[Symbol.match]('test')).not.toBeNull();
    expect(() => {
      const matcher3 = new Matcher('/test');
      const result = matcher3[Symbol.match]('test/');
      if (result === null) {
        throw new Error('Expected match but got null');
      }
    }).toThrowError('Expected match but got null');
  });
});