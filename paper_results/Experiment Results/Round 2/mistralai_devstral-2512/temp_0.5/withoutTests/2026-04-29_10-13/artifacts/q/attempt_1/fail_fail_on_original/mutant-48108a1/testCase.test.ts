import { Q } from "./q.js";

describe("Promise inspection", () => {
  it("should return the correct state for a pending promise", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    const inspection = promise.inspect();
    expect(inspection).toEqual({ state: "pending" });
  });
});