// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.prototype.delete", () => {
  it("should have the correct method name 'delete' in the prototype", () => {
    const promise = Q({ a: 1 });
    // Check if the method exists with the correct name
    expect(typeof promise.del).toBe('function');
    // Also verify the method works correctly
    return promise.del("a").then((result: any) => {
      expect(result).toBeUndefined();
    });
  });
});