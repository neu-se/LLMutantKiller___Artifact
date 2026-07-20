import { Q } from "./q.js";

describe("Q promise resolution", () => {
  it("should resolve a promise with the correct value", (done) => {
    const deferred = Q.defer();
    let resolvedValue: unknown;

    deferred.promise.then((value) => {
      resolvedValue = value;
    });

    deferred.resolve("test value");

    setTimeout(() => {
      expect(resolvedValue).toBe("test value");
      done();
    }, 10);
  });
});