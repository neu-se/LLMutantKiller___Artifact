import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error when version is not a valid string', () => {
    expect(() => Matcher.for('/', "2.0" as any)).toThrowError();
  });
});