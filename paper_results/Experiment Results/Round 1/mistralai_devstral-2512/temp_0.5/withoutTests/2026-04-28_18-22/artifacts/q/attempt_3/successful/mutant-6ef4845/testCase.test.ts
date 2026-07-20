const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise fallback behavior", () => {
  it("should call fallback when operation is not defined in descriptor", () => {
    const customPromise = Q.makePromise(
      {},
      function(op: string, args: any[]) {
        if (op === "customOp") {
          return "fallback-result";
        }
        throw new Error("Unexpected operation: " + op);
      }
    );

    return customPromise.dispatch("customOp", []).then((result: any) => {
      expect(result).toBe("fallback-result");
    });
  });
});