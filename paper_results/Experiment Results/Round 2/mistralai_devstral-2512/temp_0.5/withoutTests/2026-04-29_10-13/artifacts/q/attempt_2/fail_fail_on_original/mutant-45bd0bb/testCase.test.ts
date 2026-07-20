import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q object creation", () => {
  it("should create objects with correct prototype chain using Q.defer()", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Verify that the promise has the correct prototype chain
    expect(Object.getPrototypeOf(promise)).toBe(Q.resolve().constructor.prototype);

    // Verify that the deferred object has the correct prototype chain
    expect(Object.getPrototypeOf(deferred)).toBe(Q.defer().constructor.prototype);

    // Verify that the promise is an instance of Promise
    expect(promise instanceof Q.resolve().constructor).toBe(true);
  });
});