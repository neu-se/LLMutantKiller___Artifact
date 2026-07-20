const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly identify Node.js stack frames", () => {
    // Directly test the isNodeFrame function behavior
    // We need to access the internal function through the module's closure
    const testModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Create test stack lines
    const nodeStackLine = "at someFunction (node.js:123:45)";
    const moduleStackLine = "at someFunction (module.js:123:45)";
    const normalStackLine = "at someFunction (/path/to/file.js:123:45)";

    // Test the behavior by checking if the mutation affects stack filtering
    // We'll test this indirectly by creating a promise with long stack support
    Q.longStackSupport = true;
    const deferred = Q.defer();
    const error = new Error("Test");
    error.stack = `${nodeStackLine}\n${moduleStackLine}\n${normalStackLine}`;

    deferred.reject(error);

    // The original code should filter out node.js and module.js frames
    // The mutated code (returning false) should not filter them
    const promise = deferred.promise;
    return promise.then(
      () => {},
      (err: any) => {
        // In original code, node.js and module.js frames should be filtered
        // In mutated code, they should remain
        expect(err.stack).toBeDefined();
        if (err.stack.includes("(node.js:") || err.stack.includes("(module.js:")) {
          // This should only happen in mutated code
          throw new Error("Node.js frames were not filtered");
        }
      }
    );
  });
});