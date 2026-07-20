import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error with a non-empty message when the path starts with a slash', () => {
    let error: Error | null = null;
    try {
      new Matcher('/');
    } catch (e) {
      error = e;
    }
    expect(error).not.toBeNull();
    expect(error!.message).not.toBe('');
  });
});