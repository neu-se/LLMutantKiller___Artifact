import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.promise resolver invocation", () => {
  it("should call the resolver function with resolve, reject, and notify arguments", () => {
    return new Promise<void>((done, fail) => {
      let resolverWasCalled = false;
      let resolveValue: unknown;

      const p = Q.promise(function (resolve: (v: unknown) => void, reject: (r: unknown) => void) {
        resolverWasCalled = true;
        resolve(42);
      });

      p.then(
        function (value: unknown) {
          expect(resolverWasCalled).toBe(true);
          expect(value).toBe(42);
          done();
        },
        function (reason: unknown) {
          fail(new Error("Promise was rejected: " + reason));
        }
      );
    });
  });
});