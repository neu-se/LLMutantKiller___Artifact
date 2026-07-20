import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.allSettled", () => {
  it("correctly transforms each promise in the array via mapping", () => {
    return Q([Q.resolve(42), Q.reject(new Error("boom"))])
      .allSettled()
      .then((results: any[]) => {
        expect(Array.isArray(results)).toBe(true);
        expect(results.length).toBe(2);
        expect(results[0].state).toBe("fulfilled");
        expect(results[0].value).toBe(42);
        expect(results[1].state).toBe("rejected");
        expect(results[1].reason.message).toBe("boom");
      });
  });
});