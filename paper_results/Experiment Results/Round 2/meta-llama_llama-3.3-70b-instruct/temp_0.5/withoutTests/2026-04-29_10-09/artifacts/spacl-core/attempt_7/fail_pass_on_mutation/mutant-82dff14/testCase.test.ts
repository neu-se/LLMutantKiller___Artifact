import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher class', () => {
  it('should not allow empty string as version', () => {
    // @ts-ignore
    expect(() => new Matcher('/', '1.1')).not.toThrowError();
    // @ts-ignore
    expect(() => new Matcher('/', undefined)).not.toThrowError();
    // @ts-ignore
    expect(() => new Matcher('/', '1.0')).not.toThrowError();
    // @ts-ignore
    expect(() => new Matcher('/', '1')).not.toThrowError();
  });
});