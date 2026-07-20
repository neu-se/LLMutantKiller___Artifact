import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all resolves correctly", () => {
  it("should sum values using reduce-based internal operations", () => {
    // Q.any uses array_reduce internally with a pendingCount accumulation
    // Test that Q.all properly processes all promises
    const promises = [Q.resolve(10), Q.resolve(20), Q.resolve(30)];
    return Q.all(promises).then((values: number[]) => {
      const sum = values.reduce((a, b) => a + b, 0);
      expect(sum).toBe(60);
    });
  });
});