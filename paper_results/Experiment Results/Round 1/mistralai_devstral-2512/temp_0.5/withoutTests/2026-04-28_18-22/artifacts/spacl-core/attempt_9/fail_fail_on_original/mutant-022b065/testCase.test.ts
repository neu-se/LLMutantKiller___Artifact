import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher constructor', () => {
  it('should throw error for root path "/"', () => {
    expect(() => new Matcher('/')).toThrow('Path must not end with a slash');
  });
});