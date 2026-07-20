import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with f/fe ending words', () => {
  it('should correctly handle the word "roof" as an exception', () => {
    expect(plural('roof')).toBe('roofs');
  });
});