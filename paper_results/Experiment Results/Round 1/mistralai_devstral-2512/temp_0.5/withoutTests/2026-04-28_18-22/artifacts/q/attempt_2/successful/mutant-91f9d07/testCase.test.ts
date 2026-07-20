import { denodeify } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("denodeify behavior", () => {
  it("should handle valid callback correctly", () => {
    const testCallback = (a: number, b: number, cb: (err: Error | null, result?: number) => void) => {
      cb(null, a + b);
    };
    const promisedAdd = denodeify(testCallback);
    return promisedAdd(2, 3).then((result) => {
      expect(result).toBe(5);
    });
  });
});