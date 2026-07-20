import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
  it("should resolve with actual values not promise objects when promises are pending", () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    deferred1.resolve(10);
    deferred2.resolve(20);

    const result = Q.all([deferred1.promise, deferred2.promise]);

    return result.then(function (values: any[]) {
      // On mutated code, values will contain promise objects, not numbers
      expect(typeof values[0]).toBe("number");
      expect(typeof values[1]).toBe("number");
      expect(values[0]).toBe(10);
      expect(values[1]).toBe(20);
    });
  });
});