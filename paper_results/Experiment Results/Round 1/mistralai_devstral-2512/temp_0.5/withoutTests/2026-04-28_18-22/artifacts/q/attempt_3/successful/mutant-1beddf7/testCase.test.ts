const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise constructor", () => {
  it("should execute the resolver function when provided", (done) => {
    let resolverCalled = false;
    const testPromise = Q.promise((resolve: any) => {
      resolverCalled = true;
      resolve("test");
    });

    testPromise.then((value: any) => {
      expect(resolverCalled).toBe(true);
      expect(value).toBe("test");
      done();
    });
  });
});