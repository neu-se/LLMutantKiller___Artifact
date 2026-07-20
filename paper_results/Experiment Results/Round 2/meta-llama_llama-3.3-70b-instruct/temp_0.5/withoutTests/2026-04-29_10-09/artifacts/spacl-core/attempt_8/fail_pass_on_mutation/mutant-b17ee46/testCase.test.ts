import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should not throw an error when version is undefined', () => {
    expect(() => Matcher.for('/', undefined)).not.toThrowError();
  });
  it.skip('should throw an error when version is an empty string', () => {
    expect(() => Matcher.for('/', "")).toThrowError();
  });
});