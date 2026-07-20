import { Q } from "./q";

describe("Q promise valueOf behavior", () => {
  it("should return the resolved value when promise is fulfilled", () => {
    const deferred = Q.defer();
    const expectedValue = 42;
    deferred.resolve(expectedValue);

    const promise = deferred.promise;
    const valueOfResult = promise.valueOf();

    expect(valueOfResult).toBe(expectedValue);
  });
});