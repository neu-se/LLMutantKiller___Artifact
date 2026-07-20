import { defer } from "./q.js";

describe("defer", () => {
  it("should resolve a promise with the given value", (done) => {
    const deferred = defer();
    const expectedValue = "test value";

    deferred.promise.then((value) => {
      expect(value).toBe(expectedValue);
      done();
    });

    deferred.resolve(expectedValue);
  });
});