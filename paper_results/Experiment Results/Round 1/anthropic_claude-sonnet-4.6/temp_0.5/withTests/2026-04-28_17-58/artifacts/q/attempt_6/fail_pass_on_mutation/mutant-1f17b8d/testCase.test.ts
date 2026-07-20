import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
  it("should resolve with numeric values not promise objects when given pending promises", () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    // Resolve BEFORE calling Q.all, but these are deferred promises
    // that won't be synchronously inspectable as fulfilled
    const result = Q.all([deferred1.promise, deferred2.promise]);

    deferred1.resolve(1);
    deferred2.resolve(2);

    return result.then(function(values: any[]) {
      // On original: values = [1, 2]
      // On mutated: values = [promise, promise] (resolved immediately with promise objects)
      expect(values[0]).toBe(1);
      expect(values[1]).toBe(2);
      expect(typeof values[0]).toBe("number");
      expect(typeof values[1]).toBe("number");
    });
  });
});