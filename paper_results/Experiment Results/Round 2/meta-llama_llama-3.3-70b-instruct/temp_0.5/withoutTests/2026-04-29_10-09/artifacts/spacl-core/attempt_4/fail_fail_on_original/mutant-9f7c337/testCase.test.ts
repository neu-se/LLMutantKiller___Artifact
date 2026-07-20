import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should not throw an error for path /a/+b in version 1.1', () => {
    expect(() => new Matcher('/a/+b')).not.toThrowError('Path contains malformed wildcards');
  });
});