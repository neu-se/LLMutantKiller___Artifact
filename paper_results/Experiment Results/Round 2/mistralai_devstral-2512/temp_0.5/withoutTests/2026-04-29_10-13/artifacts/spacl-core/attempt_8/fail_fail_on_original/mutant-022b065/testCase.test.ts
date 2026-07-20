import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error for a single slash path', () => {
    expect(() => {
      new Matcher('/');
    }).toThrow('Path must not end with a slash');
  });
});