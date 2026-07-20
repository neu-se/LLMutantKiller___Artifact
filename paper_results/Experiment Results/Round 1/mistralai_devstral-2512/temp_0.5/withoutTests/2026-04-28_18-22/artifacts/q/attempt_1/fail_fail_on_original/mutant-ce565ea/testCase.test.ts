import { Q } from "./q";

describe("Q Promise valueOf behavior", () => {
  it("should return the promise itself when state is pending", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    expect(promise.valueOf()).toBe(promise);
  });
});