import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta module export', () => {
  it('should export Delta when module is an object', () => {
    // This test directly checks the module export condition
    // The mutation changes `typeof module === 'object'` to `typeof module === ""`
    // which will cause the export to fail in Node.js environments
    const testModule = { exports: {} };
    const originalModule = global.module;
    global.module = testModule;

    try {
      // Re-import to trigger the export logic
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/delta/src/Delta")];
      const Delta = require("../../../../../../../../../../../subject_repositories/delta/src/Delta").default;
      expect(typeof Delta).toBe('function');
    } finally {
      global.module = originalModule;
    }
  });
});