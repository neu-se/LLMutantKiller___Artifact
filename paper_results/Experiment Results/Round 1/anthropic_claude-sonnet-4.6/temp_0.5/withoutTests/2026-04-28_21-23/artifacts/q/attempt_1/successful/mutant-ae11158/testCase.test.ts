import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nfapply", () => {
  it("should call a Node-style callback function with provided args and return a promise with the result", async () => {
    function nodeStyleAdd(a: number, b: number, callback: (err: Error | null, result?: number) => void) {
      callback(null, a + b);
    }

    const result = await Q.nfapply(nodeStyleAdd, [3, 4]);
    expect(result).toBe(7);
  });
});