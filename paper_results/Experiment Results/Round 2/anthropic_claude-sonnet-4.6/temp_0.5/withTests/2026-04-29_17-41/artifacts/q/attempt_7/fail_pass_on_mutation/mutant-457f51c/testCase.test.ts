import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q allSettled with mixed promises", () => {
  it("correctly identifies states of fulfilled and rejected promises in allSettled", () => {
    const reason = new Error("failed");
    return Q.allSettled([Q(1), Q.reject(reason), Q(3)])
      .then((results: any[]) => {
        expect(results[0].state).toBe("fulfilled");
        expect(results[0].value).toBe(1);
        expect(results[1].state).toBe("rejected");
        expect(results[1].reason).toBe(reason);
        expect(results[2].state).toBe("fulfilled");
        expect(results[2].value).toBe(3);
      });
  });
});