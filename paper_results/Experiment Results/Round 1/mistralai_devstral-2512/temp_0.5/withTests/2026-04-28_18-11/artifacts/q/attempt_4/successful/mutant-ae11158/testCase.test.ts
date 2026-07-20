import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nfapply", () => {
  it("should return a promise that resolves with the callback result", () => {
    const testCallback = (a: number, b: number, cb: (err: Error | null, result?: number) => void) => {
      cb(null, a + b);
    };
    const result = Q.nfapply(testCallback, [1, 2]);
    expect(typeof Q.nfapply).toBe('function');
    return result.then((sum: number) => {
      expect(sum).toBe(3);
    });
  });
});