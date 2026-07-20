import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with undefined num parameter', () => {
  it('should return plural form when num is undefined', () => {
    const result = plural('apple', undefined);
    expect(result).toBe('apples');
  });
});