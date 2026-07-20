// Test to detect the mutation in q.js
const q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library initialization", () => {
  it("should properly initialize Q and expose the correct API", () => {
    // The mutation affects the ses (Secure ECMAScript) environment check
    // We test that Q is properly initialized by checking its core functionality
    expect(q).toBeDefined();

    // Test that Q can create promises
    const promise = q();
    expect(promise).toBeDefined();

    // Test that Q has the defer method
    expect(q.defer).toBeDefined();
    expect(typeof q.defer).toBe("function");

    // Test basic promise creation
    const deferred = q.defer();
    expect(deferred).toBeDefined();
    expect(deferred.promise).toBeDefined();
    expect(typeof deferred.resolve).toBe("function");
    expect(typeof deferred.reject).toBe("function");

    // Test promise resolution
    let resolved = false;
    deferred.promise.then(() => {
      resolved = true;
    });
    deferred.resolve("test");
    expect(resolved).toBe(true);
  });
});