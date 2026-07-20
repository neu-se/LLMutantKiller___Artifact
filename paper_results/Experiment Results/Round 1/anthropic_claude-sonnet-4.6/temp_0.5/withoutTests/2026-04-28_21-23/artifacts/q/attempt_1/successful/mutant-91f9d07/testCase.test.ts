import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.denodeify", () => {
  it("should work normally when a valid callback is provided", async () => {
    const nodeStyleFn = (a: number, b: number, cb: (err: null, result: number) => void) => {
      cb(null, a + b);
    };

    const denodeified = Q.denodeify(nodeStyleFn);
    const result = await denodeified(3, 4);
    expect(result).toBe(7);
  });
});