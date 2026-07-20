import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.when", () => {
  it("should call the fulfilled callback with the resolved value", () => {
    return new Promise<void>((resolve, reject) => {
      const result = Q.when(42, function (value: number) {
        try {
          expect(value).toBe(42);
          resolve();
        } catch (e) {
          reject(e);
        }
      }, function () {
        reject(new Error("Should not have been rejected"));
      });

      // If when() returns undefined (mutant), the promise chain won't work
      if (result === undefined || result === null) {
        reject(new Error("Q.when returned undefined instead of a promise"));
      }
    });
  });
});