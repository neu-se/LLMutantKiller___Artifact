import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural bacterium rule', () => {
  it('should pluralize bacterium to bacteria', () => {
    expect(plural('bacterium')).toBe('bacteria');
  });
});