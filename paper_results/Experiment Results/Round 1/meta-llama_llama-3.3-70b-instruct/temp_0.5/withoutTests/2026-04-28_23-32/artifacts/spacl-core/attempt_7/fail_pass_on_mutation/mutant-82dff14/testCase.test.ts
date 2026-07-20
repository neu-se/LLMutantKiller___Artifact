import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should not throw an error when creating a new instance with a valid version', () => {
    expect(() => new Matcher('/path', '1.1')).not.toThrowError();
  });
});