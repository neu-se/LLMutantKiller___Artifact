import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should correctly handle the min value in the compile function', () => {
    const matcher = new Matcher('/a*');
    expect(matcher[Symbol.match]('/a')).not.toBeNull();
    expect(matcher[Symbol.match]('/')).toBeNull();
    const matcher2 = new Matcher('/a');
    expect(matcher2[Symbol.match]('/a')).not.toBeNull();
    expect(matcher2[Symbol.match]('/')).toBeNull();
    expect(() => new Matcher('/')).toThrowError('Path must not end with a slash');
    expect(() => new Matcher('/a')).not.toThrowError();
    expect(() => new Matcher('/a+')).not.toThrowError();
  });
});