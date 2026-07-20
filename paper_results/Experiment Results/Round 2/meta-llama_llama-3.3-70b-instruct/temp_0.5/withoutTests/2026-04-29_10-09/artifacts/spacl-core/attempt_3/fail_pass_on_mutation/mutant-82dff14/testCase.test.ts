import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher class', () => {
  it('should not throw an error when version is provided', () => {
    expect(() => new Matcher('/', '1.1')).not.toThrowError();
  });
});