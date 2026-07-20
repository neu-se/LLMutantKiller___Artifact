import { Q } from "./q.js";

describe("Promise inspect method", () => {
  it("should return the correct state for pending promises", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    const inspection = promise.inspect();
    expect(inspection).toEqual({ state: "pending" });
  });
});