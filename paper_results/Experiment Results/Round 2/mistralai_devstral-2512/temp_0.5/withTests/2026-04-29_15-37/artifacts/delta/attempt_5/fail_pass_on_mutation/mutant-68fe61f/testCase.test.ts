import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta module export', () => {
  it('should export Delta when module is an object', () => {
    // This test verifies the module export logic by checking if the module export condition works
    // The mutation changes `typeof module === 'object'` to `typeof module === ""`
    // which will cause the export to fail in Node.js environments
    const testModule = { exports: {} };
    const originalModule = global.module;
    global.module = testModule;

    try {
      // Force re-evaluation of the module export logic
      const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/delta/src/Delta");
      delete require.cache[modulePath];
      const freshModule = require(modulePath);
      expect(freshModule.default).toBeDefined();
      expect(typeof freshModule.default).toBe('function');
    } finally {
      global.module = originalModule;
    }
  });
});