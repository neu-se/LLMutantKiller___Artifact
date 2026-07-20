import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.catch method", () => {
  it("should be accessible as Q.catch", () => {
    const deferred = Q.defer();
    const error = new Error("test error");
    deferred.reject(error);

    const promise = Q.catch(deferred.promise, (err) => {
      expect(err).toBe(error);
      return "recovered";
    });

    return promise.then((result) => {
      expect(result).toBe("recovered");
    });
  });
});