import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher class', () => {
  it('should throw an error when version is not provided and default version is empty string', () => {
    // @ts-ignore
    expect(() => new Matcher('/', '1.1')).not.toThrowError();
    // @ts-ignore
    expect(() => new Matcher('/', '1')).not.toThrowError();
    // @ts-ignore
    expect(() => new Matcher('/', '1.0')).not.toThrowError();
    // @ts-ignore
    expect(() => new Matcher('/', undefined)).not.toThrowError();
    // @ts-ignore
    expect(() => {
      const matcher = new Matcher('/', undefined);
      // @ts-ignore
      new Matcher('/', matcher.version);
    }).toThrowError();
  });
});