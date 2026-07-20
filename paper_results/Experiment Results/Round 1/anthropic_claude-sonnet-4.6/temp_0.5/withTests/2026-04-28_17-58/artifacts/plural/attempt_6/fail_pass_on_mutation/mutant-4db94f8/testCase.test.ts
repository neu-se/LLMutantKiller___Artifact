import pluralFn from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural string rule matching', () => {
  it('should return correct plural for word added via string addRule', () => {
    // Use a word that cannot match any existing regex rules
    // 'bacterium' ends in 'um' - no regex matches this
    // It's added as a string rule: addRule('bacterium', 'bacteria')
    expect(pluralFn('bacterium')).toBe('bacteria');
  });
});