import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error when version is an empty string and path is invalid', () => {
    // @ts-ignore
    expect(() => Matcher.for('invalid', "")).toThrowError('Path contains invalid characters');
  });
});