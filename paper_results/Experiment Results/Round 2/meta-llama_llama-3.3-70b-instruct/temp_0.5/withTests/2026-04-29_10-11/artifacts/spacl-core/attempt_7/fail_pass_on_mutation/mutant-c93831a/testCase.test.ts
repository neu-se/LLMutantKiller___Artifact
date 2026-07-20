import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should match paths correctly', () => {
    const matcher = new Matcher('/foo');
    const string = '/foo';
    const result = matcher[Symbol.match](string);
    expect(result).not.toBeNull();
    expect(result.index).toBe(0);
    expect(result[0]).toBe('/foo');
  });
});