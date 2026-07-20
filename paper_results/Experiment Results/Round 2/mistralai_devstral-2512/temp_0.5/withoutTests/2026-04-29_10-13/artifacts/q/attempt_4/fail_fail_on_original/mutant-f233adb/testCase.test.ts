// Test to detect the mutation in q.js
const q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library initialization", () => {
  it("should properly initialize Q in a Node.js environment", () => {
    // Verify Q was properly initialized in Node.js
    expect(q.Q).toBeDefined();
    expect(typeof q.Q).toBe("function");

    // Test basic promise functionality
    const deferred = q.Q.defer();
    expect(deferred).toBeDefined();
    expect(deferred.promise).toBeDefined();
    expect(typeof deferred.resolve).toBe("function");
    expect(typeof deferred.reject).toBe("function");
  });
});