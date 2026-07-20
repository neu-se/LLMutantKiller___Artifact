import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error for invalid path specifications', () => {
    expect(() => new Matcher('')).toThrowError('Path must begin with a slash');
    expect(() => new Matcher('/')).toThrowError('Path must not end with a slash');
    expect(() => new Matcher('/a/')).toThrowError('Path must not end with a slash');
    expect(() => new Matcher('/a:b')).toThrowError('Path contains malformed captures');
    expect(() => new Matcher('/a*+')).toThrowError('Path contains malformed wildcards');
    expect(() => new Matcher('/a//b')).toThrowError('Path contains empty segments');
  });
});