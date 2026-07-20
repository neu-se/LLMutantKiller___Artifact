import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher constructor version parameter', () => {
  it('should throw an error when using empty string as version', () => {
    expect(() => {
      new Matcher('/test', '' as any);
    }).toThrow('Path contains malformed wildcards');
  });
});