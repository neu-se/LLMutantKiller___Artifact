import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nfapply", () => {
  it("should resolve with the result of the Node-style callback", async () => {
    const result = await Q.nfapply((a: number, b: number, callback: (err: Error | null, result?: number) => void) => {
      callback(null, a + b);
    }, [2, 3]);

    expect(result).toBe(5);
  });
});