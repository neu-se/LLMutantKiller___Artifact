import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher constructor', () => {
  it('should accept path "/" without throwing error', () => {
    expect(() => new Matcher('/')).not.toThrow();
  });
});