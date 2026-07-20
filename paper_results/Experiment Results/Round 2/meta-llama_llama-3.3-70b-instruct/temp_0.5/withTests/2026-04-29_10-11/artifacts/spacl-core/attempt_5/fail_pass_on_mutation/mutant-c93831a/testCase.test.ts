import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should match paths correctly', () => {
    const matcher = new Matcher('/foo');
    const string = '/foo';
    const result = matcher[Symbol.match](string);
    expect(result).not.toBeNull();
    const matcher2 = new Matcher('/foo');
    const string2 = '/foo/';
    const result2 = matcher2[Symbol.match](string2);
    expect(result2).toBeNull();
  });
});