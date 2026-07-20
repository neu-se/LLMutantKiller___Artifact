import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural with num=1 should return singular form', () => {
  it('should return the original word when num is 1', () => {
    expect(plural('test', 1)).toBe('test');
  });
});