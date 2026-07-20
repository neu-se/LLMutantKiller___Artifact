const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise post method behavior", () => {
  it("should handle null function name correctly in post method", () => {
    const obj = function() {
      return "called function";
    };

    // Test with null name - should call the object itself as a function
    const promise = Q(obj).post(null, []);
    return promise.then((result: any) => {
      expect(result).toBe("called function");
    });
  });
});