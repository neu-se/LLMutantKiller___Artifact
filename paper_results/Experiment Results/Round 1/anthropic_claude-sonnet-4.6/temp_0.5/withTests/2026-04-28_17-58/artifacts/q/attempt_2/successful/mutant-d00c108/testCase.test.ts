import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.race", () => {
  it("should resolve when given an array with an already-resolved promise", () => {
    const resolved = Q.resolve(42);
    const deferred = Q.defer();

    const raceResult = Q.race([resolved, deferred.promise]);

    return raceResult.then((value: unknown) => {
      expect(value).toBe(42);
    });
  });
});