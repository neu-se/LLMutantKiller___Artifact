import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error when version is not provided', () => {
    expect(() => Matcher.for('path', undefined as any)).toThrowError('Path contains invalid characters');
  });
});