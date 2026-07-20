import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural with undefined num', () => {
  it('should pluralize when num is explicitly undefined', () => {
    expect(plural('test', undefined)).toBe('tests');
  });
});