import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_map produces correct mapped output", () => {
  it("allSettled on a promise for an array uses array_map and returns correct length", () => {
    // Q([...]).allSettled() calls array_map internally via Promise.prototype.allSettled
    // which does: this.then(function(promises) { return all(array_map(promises, ...)) })
    const input = [Q.resolve(1), Q.resolve(2), Q.resolve(3), Q.resolve(4), Q.resolve(5)];
    
    return Q.allSettled(input).then(function(results: any[]) {
      expect(results.length).toBe(5);
      expect(results.map((r: any) => r.value)).toEqual([1, 2, 3, 4, 5]);
    });
  });
});