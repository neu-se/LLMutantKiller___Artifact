import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta module export', () => {
  it('should export Delta when module is an object', () => {
    // This test verifies the module export logic by checking the exact export condition
    // The mutation changes `typeof module === 'object'` to `typeof module === ""`
    // which will cause the export to fail in Node.js environments
    const testModule = { exports: {} };
    const originalModule = global.module;
    global.module = testModule;

    try {
      // Clear the module cache to force re-evaluation
      const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/delta/src/Delta");
      delete require.cache[modulePath];

      // Re-import to trigger the export logic
      const freshModule = require(modulePath);

      // The mutation will cause this to fail because module.exports won't be set
      expect(freshModule).toHaveProperty('default');
      expect(typeof freshModule.default).toBe('function');

      // Create an instance to verify functionality
      const delta = new freshModule.default().insert('test');
      expect(delta.ops).toEqual([{ insert: 'test' }]);
    } finally {
      global.module = originalModule;
    }
  });
});