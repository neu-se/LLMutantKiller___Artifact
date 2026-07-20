import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should not throw an error when version is not provided and defaults to 1.1', () => {
    expect(() => Matcher.for('/', '')).toThrowError('version must be one of 1, 1.0, 1.1');
  });
});