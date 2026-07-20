import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error when calling match multiple times with a string ending with a slash', () => {
    const matcher = new Matcher('/');
    matcher[Symbol.match]('path/');
    expect(() => {
      matcher[Symbol.match]('path/');
    }).toThrowError('Matcher should return null for strings ending with a slash');
  });
});