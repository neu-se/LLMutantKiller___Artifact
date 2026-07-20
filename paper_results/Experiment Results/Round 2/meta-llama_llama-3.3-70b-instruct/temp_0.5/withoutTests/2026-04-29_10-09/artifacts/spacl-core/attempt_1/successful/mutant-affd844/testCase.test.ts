import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error with a descriptive message when the path contains malformed captures', () => {
    const spec = '/:a:/b';
    expect(() => new Matcher(spec)).toThrowError('Path contains malformed captures');
  });
});