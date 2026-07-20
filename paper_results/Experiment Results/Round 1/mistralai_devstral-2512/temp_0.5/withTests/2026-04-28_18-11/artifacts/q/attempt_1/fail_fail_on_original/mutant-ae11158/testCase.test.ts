import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nfapply", () => {
  it("should return a promise when called with a callback and args", () => {
    const callback = (a: number, b: number, cb: (err: Error | null, result?: number) => void) => {
      cb(null, a + b);
    };
    const result = Q.nfapply(callback, [1, 2]);
    expect(result).toBeInstanceOf(Promise);
    return result.then((sum: number) => {
      expect(sum).toBe(3);
    });
  });
});