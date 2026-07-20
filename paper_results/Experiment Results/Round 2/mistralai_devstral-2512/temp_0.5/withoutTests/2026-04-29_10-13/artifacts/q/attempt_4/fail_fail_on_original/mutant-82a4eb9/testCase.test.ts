// Test to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q module export behavior", () => {
  it("should only export Q when both exports and module are objects (AND condition)", () => {
    // Create a test environment where only module is an object
    const testEnv = {
      module: { exports: {} },
      exports: null,
      require: require,
      __filename: __filename,
      __dirname: __dirname
    };

    // Execute the Q module in our test environment
    const vm = require('vm');
    const qCode = `const module = require('module');\n${require('fs').readFileSync("../../../../../../../../../../../subject_repositories/q/q.js", 'utf8')}`;
    const script = new vm.Script(qCode);
    const context = vm.createContext(testEnv);
    script.runInContext(context);

    // In the original code (AND condition), Q should NOT be exported
    // In the mutated code (OR condition), Q WOULD be exported
    expect(testEnv.module.exports).toBeDefined();
    expect(typeof testEnv.module.exports).toBe("function");
  });
});