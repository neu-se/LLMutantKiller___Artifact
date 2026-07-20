import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher class', () => {
  it('should not throw an error when version is not provided in original code but throw an error in mutated code', () => {
    expect(() => new Matcher('/', '1.1')).not.toThrowError();
    expect(() => new Matcher('/', '')).toThrowError();
  });
});