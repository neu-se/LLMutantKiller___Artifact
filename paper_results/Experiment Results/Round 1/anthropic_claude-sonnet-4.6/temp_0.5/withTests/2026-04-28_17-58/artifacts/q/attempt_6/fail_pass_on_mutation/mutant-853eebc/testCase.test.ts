import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_map via allSettled prototype method", () => {
  it("promise allSettled instance method should return mapped inspect results", () => {
    return Q([Q.resolve(10), Q.resolve(20)]).allSettled().then(function(results: any[]) {
      expect(results.length).toBe(2);
      expect(results[0].value).toBe(10);
      expect(results[1].value).toBe(20);
    });
  });
});