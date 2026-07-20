import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
  it("resolves with values not with promise objects for pending promises", () => {
    const d1 = Q.defer();
    const d2 = Q.defer();

    // Set up Q.all BEFORE resolving - promises are pending at this point
    const allResult = Q.all([d1.promise, d2.promise]);

    // Now resolve them
    d1.resolve(100);
    d2.resolve(200);

    // Wait enough ticks for everything to propagate
    return Q.delay(50).then(function() {
      const inspection = allResult.inspect();
      expect(inspection.state).toBe("fulfilled");
      const values = (inspection as any).value;
      expect(Q.isPromise(values[0])).toBe(false);
      expect(Q.isPromise(values[1])).toBe(false);
      expect(values[0]).toBe(100);
      expect(values[1]).toBe(200);
    });
  });
});