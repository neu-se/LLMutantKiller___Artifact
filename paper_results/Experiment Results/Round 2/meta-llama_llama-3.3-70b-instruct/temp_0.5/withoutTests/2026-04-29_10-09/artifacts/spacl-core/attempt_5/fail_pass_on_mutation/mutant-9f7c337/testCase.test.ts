import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should not throw an error for path /a/+ in version 1.1', () => {
    expect(() => new Matcher('/a/+')).not.toThrowError('Path contains malformed wildcards');
  });
});