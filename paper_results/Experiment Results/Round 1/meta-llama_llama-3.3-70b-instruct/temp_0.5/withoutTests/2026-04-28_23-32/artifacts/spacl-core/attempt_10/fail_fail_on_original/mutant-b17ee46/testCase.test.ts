import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error when version is not "1", "1.0", or "1.1"', () => {
    expect(() => new Matcher('/', '1')).not.toThrowError();
    expect(() => new Matcher('/', '1.0')).not.toThrowError();
    expect(() => new Matcher('/', '1.1')).not.toThrowError();
    // @ts-ignore
    expect(() => new Matcher('/', '2')).toThrowError();
  });
});