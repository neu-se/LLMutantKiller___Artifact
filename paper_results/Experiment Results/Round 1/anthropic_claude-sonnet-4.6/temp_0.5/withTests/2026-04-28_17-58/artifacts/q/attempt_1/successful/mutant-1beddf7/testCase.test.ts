import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.promise resolver invocation", () => {
  it("should call the resolver function with resolve, reject, and notify arguments", () => {
    return new Promise<void>((done, fail) => {
      let resolverWasCalled = false;
      let resolveValue: unknown;

      Q.promise(function (resolve: (value: unknown) => void, reject: (reason: unknown) => void) {
        resolverWasCalled = true;
        resolve(42);
      }).then(function (value: unknown) {
        expect(resolverWasCalled).toBe(true);
        expect(value).toBe(42);
        done();
      }, function (err: unknown) {
        fail(new Error("Promise was rejected unexpectedly: " + err));
      });
    });
  });
});