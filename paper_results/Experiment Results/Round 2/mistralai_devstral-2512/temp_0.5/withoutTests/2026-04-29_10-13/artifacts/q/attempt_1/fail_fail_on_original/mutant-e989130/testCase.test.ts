import { Q } from "./q.js";

describe("Promise inspection", () => {
  it("should correctly identify pending state when promise is not resolved", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    const inspection = promise.inspect();
    expect(inspection.state).toBe("pending");
  });
});