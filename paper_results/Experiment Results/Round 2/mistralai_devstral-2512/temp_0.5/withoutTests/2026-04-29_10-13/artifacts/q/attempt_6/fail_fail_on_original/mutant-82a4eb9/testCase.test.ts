// Test to detect the mutation in q.js
const fs = require('fs');
const vm = require('vm');

describe("Q module export behavior", () => {
  it("should only export Q when both exports and module are objects (AND condition)", () => {
    // Read the q.js file content
    const qCode = fs.readFileSync(__dirname + '/../../../../../../../../../../../subject_repositories/q/q.js', 'utf8');

    // Create a test environment where only module is an object (exports is not an object)
    const testEnv = {
      module: { exports: {} },
      exports: null, // This is the key difference - exports is not an object
      require: require,
      __filename: __filename,
      __dirname: __dirname
    };

    // Execute the Q module in our test environment
    const script = new vm.Script(qCode);
    const context = vm.createContext(testEnv);
    script.runInContext(context);

    // In the original code (AND condition), Q should NOT be exported when exports is null
    // In the mutated code (OR condition), Q WOULD be exported when only module is an object
    // Therefore this test should pass on original and fail on mutated
    expect(testEnv.module.exports).toBeUndefined();
  });
});