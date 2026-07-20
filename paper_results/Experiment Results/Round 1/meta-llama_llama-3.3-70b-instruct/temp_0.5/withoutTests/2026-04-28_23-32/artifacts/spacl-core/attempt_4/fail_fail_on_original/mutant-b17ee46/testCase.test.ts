import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error when version is not a valid string', () => {
    // @ts-ignore
    expect(() => Matcher.for('/', 'invalid')).toThrowError('Path contains invalid characters');
  });
});