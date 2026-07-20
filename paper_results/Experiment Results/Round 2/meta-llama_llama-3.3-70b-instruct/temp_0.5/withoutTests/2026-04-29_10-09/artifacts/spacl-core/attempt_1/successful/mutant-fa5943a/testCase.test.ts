import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher', () => {
  it('should throw an error with a meaningful message when the path contains invalid characters', () => {
    const spec = 'path@with@invalid@characters';
    expect(() => new Matcher(spec)).toThrowError('Path contains invalid characters');
  });
});