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

    // This should throw an error in the original code (AND condition)
    // but would work in the mutated code (OR condition)
    expect(() => {
      script.runInContext(context);
    }).toThrow(TypeError);
  });
});