import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.nodeify", () => {
  it("should return the promise itself when called without a nodeback, enabling chaining", () => {
    return new Promise<void>((resolve, reject) => {
      const promise = Q(10).nodeify();
      
      // The returned value should be the promise (or a promise) so we can chain .then on it
      // In the original code, `return this` makes it return the promise itself
      // In the mutated code, it returns undefined, so .then would throw
      expect(promise).toBeDefined();
      expect(typeof promise.then).toBe("function");
      
      promise.then(function(ten: number) {
        expect(ten).toBe(10);
        resolve();
      }, function(err: unknown) {
        reject(err);
      });
    });
  });
});