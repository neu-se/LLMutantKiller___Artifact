import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should throw an error with a meaningful message when the path contains malformed wildcards', () => {
    const spec = '/path/*+';
    expect(() => new Matcher(spec)).toThrowError('Path contains malformed wildcards');
  });
});