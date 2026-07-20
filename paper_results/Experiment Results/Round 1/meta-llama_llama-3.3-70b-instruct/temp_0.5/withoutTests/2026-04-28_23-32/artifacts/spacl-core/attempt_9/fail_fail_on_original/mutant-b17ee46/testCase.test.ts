import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should not throw an error when version is not provided', () => {
    expect(() => new Matcher('/', '1.1')).not.toThrowError();
    // @ts-ignore
    expect(() => new Matcher('/', "")).toThrowError();
  });
});