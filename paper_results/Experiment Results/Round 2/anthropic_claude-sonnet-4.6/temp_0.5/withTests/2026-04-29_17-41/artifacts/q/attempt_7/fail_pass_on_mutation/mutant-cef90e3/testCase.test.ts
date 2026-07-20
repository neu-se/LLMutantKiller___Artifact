import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("then", () => {
  it("should call fulfilled callback only once even with multiple then chains on same promise", () => {
    const results: number[] = [];
    const p = Q(1);

    // Attach multiple thens to same fulfilled promise
    const p1 = p.then(function(v: unknown) { results.push(1); return v; });
    const p2 = p.then(function(v: unknown) { results.push(2); return v; });

    return Q.all([p1, p2]).then(function() {
      // Each then should fire exactly once
      expect(results).toEqual([1, 2]);
    });
  });
});