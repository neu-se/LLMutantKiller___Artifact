import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error for malformed wildcards with a forward slash before an asterisk', () => {
    expect(() => new Matcher('/a/*b', '1')).toThrowError('Path contains malformed wildcards');
  });
});