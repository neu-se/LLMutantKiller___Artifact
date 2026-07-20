import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher class', () => {
  it('should throw an error when version is not a valid version', () => {
    // @ts-ignore
    expect(() => new Matcher('/', 'invalid')).toThrowError();
  });
});