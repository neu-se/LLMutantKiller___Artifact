import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher constructor', () => {
  it('should accept root path "/"', () => {
    const matcher = new Matcher('/');
    expect(matcher.spec).toBe('/');
  });
});