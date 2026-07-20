import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should not throw an error when version is provided', () => {
    expect(() => Matcher.for('/', '1.1')).not.toThrowError();
  });
});