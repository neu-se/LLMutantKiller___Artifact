import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_map shim", () => {
  it("allResolved maps each promise through Q and returns correct number of results", () => {
    return Q.allResolved([Q.resolve(1), Q.resolve(2), Q.resolve(3)])
      .then(function(promises: any[]) {
        expect(promises.length).toBe(3);
        const values = promises.map((p: any) => p.inspect().value);
        expect(values).toEqual([1, 2, 3]);
      });
  });
});