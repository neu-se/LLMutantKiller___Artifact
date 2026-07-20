import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural behavior with num parameter', () => {
  it('should pluralize when called with num of 2', () => {
    expect(plural('test', 2)).toBe('tests');
    expect(plural('cherry', 2)).toBe('cherries');
    expect(plural('box', 2)).toBe('boxes');
  });
});