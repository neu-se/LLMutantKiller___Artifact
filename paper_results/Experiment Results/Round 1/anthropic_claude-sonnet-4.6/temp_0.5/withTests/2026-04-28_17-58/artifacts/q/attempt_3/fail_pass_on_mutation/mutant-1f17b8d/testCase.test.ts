import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
  it("should wait for all pending promises to resolve before fulfilling", () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    const result = Q.all([deferred1.promise, deferred2.promise]);

    // The result should still be pending since neither promise has resolved
    expect(result.isPending()).toBe(true);

    deferred1.resolve(10);
    deferred2.resolve(20);

    return result.then(function (values: any[]) {
      expect(values[0]).toBe(10);
      expect(values[1]).toBe(20);
    });
  });
});