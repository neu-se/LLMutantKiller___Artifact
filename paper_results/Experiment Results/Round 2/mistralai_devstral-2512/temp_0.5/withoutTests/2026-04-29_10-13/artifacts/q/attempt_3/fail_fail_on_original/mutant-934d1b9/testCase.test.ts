const Q = require("./q.js");

describe("Q defer resolution", () => {
  it("should resolve a deferred promise correctly", (done) => {
    const deferred = Q.defer();
    let resolved = false;

    deferred.promise.then(() => {
      resolved = true;
    });

    deferred.resolve("test");

    setTimeout(() => {
      expect(resolved).toBe(true);
      done();
    }, 10);
  });
});