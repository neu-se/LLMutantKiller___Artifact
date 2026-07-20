import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q['catch'] static method", () => {
  it("should exist as a function on the Q object and handle rejections", async () => {
    const error = new Error("test error");
    
    // In original code, Q["catch"] is defined
    // In mutated code, Q[""] is defined instead, so Q["catch"] is undefined
    expect(typeof Q["catch"]).toBe("function");
    
    const result = await Q["catch"](Q.reject(error), function(reason: Error) {
      return "caught: " + reason.message;
    });
    
    expect(result).toBe("caught: test error");
  });
});