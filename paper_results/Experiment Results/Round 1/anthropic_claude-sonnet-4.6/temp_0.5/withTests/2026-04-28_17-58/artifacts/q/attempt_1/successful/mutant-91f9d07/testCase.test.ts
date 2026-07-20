import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.denodeify", () => {
  it("should work normally when callback is a valid function", () => {
    // In the original code, `if (callback === undefined)` only triggers when callback is undefined
    // In the mutated code, `if (true)` always triggers, breaking denodeify for valid callbacks
    const nodeStyleFn = function(a: number, b: number, callback: (err: Error | null, result?: number) => void) {
      callback(null, a + b);
    };

    const denodeified = Q.denodeify(nodeStyleFn);
    return denodeified(3, 4).then(function(result: number) {
      expect(result).toBe(7);
    });
  });
});