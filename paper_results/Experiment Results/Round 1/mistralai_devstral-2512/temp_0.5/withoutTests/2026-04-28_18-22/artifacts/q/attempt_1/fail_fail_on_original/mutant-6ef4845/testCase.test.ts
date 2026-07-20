import { Q } from "./q.js";

describe("Promise fallback behavior", () => {
  it("should call fallback when operation is not defined in descriptor", () => {
    const customPromise = Q.makePromise(
      {},
      function(op, args) {
        if (op === "customOp") {
          return "fallback-result";
        }
        throw new Error("Unexpected operation: " + op);
      }
    );

    return customPromise.dispatch("customOp", []).then(result => {
      expect(result).toBe("fallback-result");
    });
  });
});