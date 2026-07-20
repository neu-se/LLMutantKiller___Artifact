import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with num parameter', () => {
  it('should return singular form when num is 1', () => {
    const result = plural('apple', 1);
    expect(result).toBe('apple');
  });
});