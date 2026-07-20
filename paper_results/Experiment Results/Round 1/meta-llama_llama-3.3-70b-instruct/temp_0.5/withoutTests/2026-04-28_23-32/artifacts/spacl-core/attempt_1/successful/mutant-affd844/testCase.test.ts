import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error with a meaningful message when path contains malformed captures', () => {
    const spec = '/:a:b';
    expect(() => new Matcher(spec)).toThrowError('Path contains malformed captures');
  });
});