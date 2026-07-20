import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher constructor version parameter', () => {
  it('should use version 1.1 by default when constructor is called directly', () => {
    const matcher = new Matcher('/test');
    expect(matcher).toBeInstanceOf(Matcher);
  });
});