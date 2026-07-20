import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString mutation detection", () => {
  it("should handle long stack traces without accessing undefined array elements", async () => {
    // Enable long stack support to trigger filterStackString
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      // Create a chain of promises that will trigger makeStackTraceLong
      // which calls filterStackString internally
      const result = await Q.reject(new Error("test error"))
        .then(null, function (err) {
          // Catch the rejection - this triggers makeStackTraceLong -> filterStackString
          // The mutation causes i <= lines.length which accesses lines[lines.length] = undefined
          // and then tries to call methods on undefined, causing a TypeError
          return "caught";
        });

      expect(result).toBe("caught");
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});