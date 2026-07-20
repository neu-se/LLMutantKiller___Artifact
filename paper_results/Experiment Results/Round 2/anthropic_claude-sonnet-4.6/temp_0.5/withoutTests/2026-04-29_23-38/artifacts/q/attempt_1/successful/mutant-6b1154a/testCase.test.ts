import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.done", () => {
  it("should call the fulfilled callback when promise resolves and fulfilled handler is provided", () => {
    return new Promise<void>((resolve, reject) => {
      const fulfilledValues: number[] = [];
      
      Q(42).done(
        function (value: number) {
          fulfilledValues.push(value);
          try {
            expect(fulfilledValues).toEqual([42]);
            resolve();
          } catch (e) {
            reject(e);
          }
        },
        function (err: unknown) {
          reject(new Error("Should not have been rejected: " + err));
        }
      );
      
      // Give it time to resolve asynchronously
      setTimeout(() => {
        if (fulfilledValues.length === 0) {
          reject(new Error("fulfilled callback was never called"));
        }
      }, 500);
    });
  });
});