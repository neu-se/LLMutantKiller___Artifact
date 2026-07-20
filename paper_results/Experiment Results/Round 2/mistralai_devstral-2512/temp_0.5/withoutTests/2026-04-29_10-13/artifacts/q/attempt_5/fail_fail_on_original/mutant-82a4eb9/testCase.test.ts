// Test to detect the mutation in q.js
const path = require('path');
const fs = require('fs');

// Get the correct path to q.js
const qPath = path.join(__dirname, '../../../../../../../../../../../../subject_repositories/q/q.js');
const Q = require(qPath);

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

    // Read and execute the Q module in our test environment
    const vm = require('vm');
    const qCode = fs.readFileSync(qPath, 'utf8');
    const script = new vm.Script(qCode);
    const context = vm.createContext(testEnv);

    // In the original code (AND condition), Q should NOT be exported when only module is an object
    // In the mutated code (OR condition), Q WOULD be exported when only module is an object
    script.runInContext(context);

    // This test should pass on original (where exports is null) and fail on mutated
    expect(testEnv.module.exports).toBeUndefined();
  });
});