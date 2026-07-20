import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
  it("should test the behavior of the mutated file", async () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    const error = new Error("Test error");

    Q.onerror = (err) => {
      throw err;
    };

    deferred.reject(error);

    try {
      await promise;
    } catch (err) {
      expect(err).toBe(error);
    }

    expect(Q.getUnhandledReasons()).toEqual([]);
  });
});