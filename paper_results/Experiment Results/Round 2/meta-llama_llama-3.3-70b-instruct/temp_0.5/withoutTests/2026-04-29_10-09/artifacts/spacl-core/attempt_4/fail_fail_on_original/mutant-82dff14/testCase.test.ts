import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher class', () => {
  it('should throw an error when version is an empty string', () => {
    // @ts-ignore
    expect(() => new Matcher('/', '')).toThrowError();
  });
});