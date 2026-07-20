import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural', () => {
  it('should return the word itself (singular) when no num argument is provided', () => {
    expect(plural('test')).toBe('test');
    expect(plural('cherry')).toBe('cherry');
    expect(plural('box')).toBe('box');
  });
});