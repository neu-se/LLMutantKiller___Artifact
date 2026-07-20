import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural', () => {
  it('should handle num being undefined explicitly passed vs num being 1', () => {
    const args: [string, undefined] = ['test', undefined];
    expect(plural(...args)).toBe('tests');
  });
});