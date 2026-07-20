import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q isInternalFrame fileName check", () => {
  it("only filters frames from q.js, not from other files at same line numbers", async () => {
    Q.longStackSupport = true;

    try {
      const deferred = Q.defer();

      // Use Object.defineProperty to properly override the stack (it was set as non-writable)
      Object.defineProperty(deferred.promise, 'stack', {
        value: "    at Object.<anonymous> (/fake/other-file.js:1000:10)",
        configurable: true,
        writable: true
      });
      Object.defineProperty(deferred.promise, 'stackCounter', {
        value: 1,
        configurable: true,
        writable: true
      });

      const error = new Error("test rejection");
      deferred.reject(error);

      const caught = await deferred.promise.then(null, (e: Error) => e);

      expect(caught.stack).toContain("other-file.js");
    } finally {
      Q.longStackSupport = false;
    }
  });
});