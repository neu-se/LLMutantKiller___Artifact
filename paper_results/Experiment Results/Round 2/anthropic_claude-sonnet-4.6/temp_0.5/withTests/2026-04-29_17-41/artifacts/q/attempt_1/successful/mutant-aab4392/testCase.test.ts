import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace filtering with long stack support", () => {
  it("should not throw when processing stack traces with long stack support enabled", async () => {
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      const result = await Q.Promise(function (resolve: (v: any) => void, reject: (e: any) => void) {
        Q().then(function () {
          return Q.reject(new Error("test error for stack trace"));
        }).then(resolve, reject);
      }).then(
        function () {
          return "fulfilled";
        },
        function (err: Error) {
          // Should reach here with the error, not crash
          return "rejected: " + err.message;
        }
      );

      expect(result).toBe("rejected: test error for stack trace");
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});