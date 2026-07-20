import { plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural module', () => {
  it('should correctly handle String prototype extension', () => {
    // Test basic pluralization
    expect(plural('apple', 2)).toBe('apples');

    // Test that String prototype is extended
    const testStr = 'box';
    expect(testStr.plural(2)).toBe('boxes');

    // Clear the module cache and try to require again
    // This should throw in original code (plural already defined) but not in mutated code
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/plural/index.js");
    delete require.cache[modulePath];
    expect(() => require("../../../../../../../../../../../subject_repositories/plural/index.js")).toThrow();
  });
});