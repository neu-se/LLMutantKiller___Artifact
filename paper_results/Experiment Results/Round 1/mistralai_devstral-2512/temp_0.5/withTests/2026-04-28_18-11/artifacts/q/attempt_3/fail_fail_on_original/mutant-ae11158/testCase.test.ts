import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nfapply", () => {
  it("should be a function that returns a promise when called", () => {
    const testCallback = (a: number, b: number, cb: (err: Error | null, result?: number) => void) => {
      cb(null, a + b);
    };
    const result = Q.nfapply(testCallback, [1, 2]);
    expect(typeof Q.nfapply).toBe('function');
    expect(result).toBeInstanceOf(Promise);
    return result.then((sum: number) => {
      expect(sum).toBe(3);
    });
  });
});