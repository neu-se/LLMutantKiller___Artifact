import { defer } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise inspect method", () => {
  it("should return the correct state for pending promises", () => {
    const deferred = defer();
    const promise = deferred.promise;
    const inspection = promise.inspect();
    expect(inspection).toEqual({ state: "pending" });
  });
});