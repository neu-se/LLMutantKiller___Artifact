// Test to detect the mutation in q.js
const fs = require('fs');
const vm = require('vm');

describe("Q module export behavior", () => {
  it("should only export Q when both exports and module are objects (AND condition)", () => {
    // Read the q.js file content
    const qCode = fs.readFileSync(__dirname + '/../../../../../../../../../../../subject_repositories/q/q.js', 'utf8');

    // Create a test environment where only exports is an object (module is not an object)
    const testEnv = {
      module: null, // This is the key difference - module is not an object
      exports: {}, // exports is an object
      require: require,
      __filename: __filename,
      __dirname: __dirname
    };

    // Execute the Q module in our test environment
    const script = new vm.Script(qCode);
    const context = vm.createContext(testEnv);
    script.runInContext(context);

    // In the original code (AND condition), Q should NOT be exported when module is null
    // In the mutated code (OR condition), Q WOULD be exported when only exports is an object
    // Therefore this test should pass on original and fail on mutated
    expect(testEnv.exports).toEqual({});
  });
});