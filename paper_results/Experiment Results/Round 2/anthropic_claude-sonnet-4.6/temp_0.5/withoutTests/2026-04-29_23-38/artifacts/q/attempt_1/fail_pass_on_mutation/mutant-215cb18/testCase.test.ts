import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_defineProperty fallback behavior", () => {
  it("should properly set stack property on errors when using long stack support", async () => {
    Q.longStackSupport = true;
    
    const error = new Error("test error");
    
    // Create a chain that will trigger makeStackTraceLong
    const result = await Q.reject(error)
      .then(null, function(err) {
        return err;
      });
    
    // The stack should be defined on the error object
    expect(result).toBe(error);
    expect(typeof result.stack).toBe("string");
    
    Q.longStackSupport = false;
  });
});