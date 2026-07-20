import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher class', () => {
  it('should throw an error when version is an empty string in the original code but not in the mutated code', () => {
    // @ts-ignore
    expect(() => new Matcher('/', '1.1')).not.toThrowError();
    // @ts-ignore
    expect(() => new Matcher('/', '')).toThrowError();
  });
});