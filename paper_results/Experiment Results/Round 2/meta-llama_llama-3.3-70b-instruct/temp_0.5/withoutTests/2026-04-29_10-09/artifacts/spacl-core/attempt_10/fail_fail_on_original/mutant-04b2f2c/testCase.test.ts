import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error when calling matchAll on a string that ends with a slash', () => {
    const matcher = new Matcher('/');
    const string = 'path/';
    expect(() => {
      const result = matcher[Symbol.match](string);
      if (result !== null) {
        throw new Error('Matcher should return null for strings ending with a slash');
      }
    }).not.toThrow();
    expect(() => {
      const result = matcher[Symbol.match](string);
      if (result !== null) {
        throw new Error('Matcher should return null for strings ending with a slash');
      }
    }).toThrowError('Matcher should return null for strings ending with a slash is not thrown, but it should');
  });
});