import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher constructor version parameter', () => {
  it('should throw error when version is empty string', () => {
    expect(() => {
      new Matcher('/test', '');
    }).toThrow();
  });
});