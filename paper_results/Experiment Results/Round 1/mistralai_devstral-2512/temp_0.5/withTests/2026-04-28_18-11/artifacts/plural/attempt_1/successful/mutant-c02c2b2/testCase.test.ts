import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function behavior with count parameter', () => {
  it('should return singular form when count is 1', () => {
    expect(plural('test', 1)).toBe('test');
  });
});