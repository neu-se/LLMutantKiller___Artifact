import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.catch method", () => {
  it("should be accessible as Q['catch'] and handle rejected promises", async () => {
    // The mutation changes Q["catch"] to Q[""] which means Q.catch would be undefined
    // Test that Q["catch"] exists and works correctly
    expect(typeof Q["catch"]).toBe("function");
    
    const result = await Q["catch"](Q.reject(new Error("test error")), (err: Error) => {
      return "caught: " + err.message;
    });
    
    expect(result).toBe("caught: test error");
  });
});