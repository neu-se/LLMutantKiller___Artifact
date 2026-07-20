import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural returns singular when num is 1', () => {
  it('should return the word unchanged when num is 1', () => {
    expect(plural('test', 1)).toBe('test');
  });
});