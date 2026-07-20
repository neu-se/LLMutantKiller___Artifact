const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise fallback behavior", () => {
  it("should call fallback when operation is not defined in descriptor", (done) => {
    const testObject = {
      value: 42
    };

    const promise = Q.makePromise(
      {}, // Empty descriptor (no operations defined)
      function(op: string, args: any[]) {
        // This fallback should be called for any operation
        if (op === "get") {
          return testObject[args[0]];
        }
        throw new Error("Unexpected operation: " + op);
      }
    );

    promise.get("value").then((result: any) => {
      expect(result).toBe(42);
      done();
    }).catch((error: any) => {
      done(error);
    });
  });
});