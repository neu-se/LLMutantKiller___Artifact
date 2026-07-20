import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber mutation detection", () => {
  it("should correctly resolve a rejected promise through the chain", async () => {
    // The mutation causes getFileNameAndLineNumber to return [] for named function
    // stack frames (format: "at functionName (filename:lineNumber:columnNumber)")
    // This affects isInternalFrame which filters Q internals from stack traces
    // When isInternalFrame returns wrong results, Q.done behavior may differ
    
    const result = await Q.reject(new Error("test error"))
      .then(null, function(err) {
        return err.message;
      });
    
    expect(result).toBe("test error");
  });
});