import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural module', () => {
  it('should handle String prototype extension correctly', () => {
    // Test basic functionality
    expect(plural('apple', 2)).toBe('apples');

    // Clear cache and reload to test prototype extension behavior
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/plural/index.js");
    delete require.cache[modulePath];

    // In original code: should throw because plural is already defined
    // In mutated code: won't throw because condition is always true
    let errorThrown = false;
    try {
      require("../../../../../../../../../../../subject_repositories/plural/index.js");
    } catch (e) {
      errorThrown = true;
    }

    // Original code should throw, mutated code should not
    expect(errorThrown).toBe(true);
  });
});