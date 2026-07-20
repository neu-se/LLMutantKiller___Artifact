import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_defineProperty mutation detection", () => {
  it("should handle long stack traces when Q.longStackSupport is enabled", async () => {
    Q.longStackSupport = true;
    
    const error = new Error("test error");
    
    // Create a rejected promise and handle it - this triggers makeStackTraceLong
    // which calls object_defineProperty
    const result = await Q.reject(error)
      .then(null, function(err) {
        return "caught: " + err.message;
      });
    
    expect(result).toBe("caught: test error");
    
    Q.longStackSupport = false;
  });
});