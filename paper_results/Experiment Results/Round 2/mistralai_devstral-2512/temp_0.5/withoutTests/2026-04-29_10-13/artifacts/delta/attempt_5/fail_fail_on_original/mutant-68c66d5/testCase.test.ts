import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta CommonJS export", () => {
  it("should export Delta via module.exports in CommonJS context", () => {
    // This test specifically targets the mutation where:
    // Original: if (typeof module === 'object')
    // Mutated:  if (false)
    // This breaks CommonJS module.exports assignment

    // We need to test the actual module.exports behavior
    // Since we're in ES modules, we'll use a workaround to check CommonJS exports
    const fs = require('fs');
    const path = require('path');
    const vm = require('vm');

    // Read the Delta.ts file
    const deltaPath = path.resolve("../../../../../../../../../../../subject_repositories/delta/src/Delta.ts");
    const deltaCode = fs.readFileSync(deltaPath, 'utf8');

    // Create a mock CommonJS context
    const context = {
      module: { exports: {} },
      exports: {},
      require: require,
      __dirname: path.dirname(deltaPath),
      __filename: deltaPath
    };

    // Execute the module code in the CommonJS context
    try {
      vm.runInNewContext(deltaCode, context);
    } catch (e) {
      // Expected to fail in this test environment, but we can still check exports
    }

    // In original code, module.exports should be set to Delta
    // In mutated code, the condition is always false so module.exports remains {}
    expect(context.module.exports).not.toEqual({});
    expect(context.module.exports).toBeDefined();
    expect(typeof context.module.exports).toBe('function');

    // Verify we can create an instance from the exported constructor
    const delta = new context.module.exports();
    expect(delta).toBeInstanceOf(context.module.exports);
  });
});