import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("then", () => {
  it("should resolve with the correct value when chaining through an already-resolved promise", () => {
    const results: unknown[] = [];
    
    const d = Q.defer();
    
    // Chain two thens - the second then's fulfilled value should be what
    // the first then returns, not overwritten by a second dispatch
    const p = d.promise.then(function(v: unknown) {
      results.push(v);
      return (v as number) * 2;
    });
    
    // Resolve with an already-fulfilled promise to trigger double dispatch
    d.resolve(Q(5));
    
    return p.then(function(value: unknown) {
      expect(results).toEqual([5]);
      expect(value).toBe(10);
    });
  });
});