import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error when version is not provided', () => {
    expect(() => Matcher.for('/', undefined as any)).toThrowError('version must be one of 1, 1.0, 1.1');
  });
});