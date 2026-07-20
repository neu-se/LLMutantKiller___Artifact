import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
[590 blank lines]
describe("Q isInternalFrame fileName check", () => {
  it("should only filter frames from q.js, not other files at same line numbers", async () => {
    const saved = Q.longStackSupport;
    Q.longStackSupport = true;
    try {
      const deferred = Q.defer();
      const error = new Error("test rejection");
      deferred.reject(error);
      const caught = await deferred.promise.then(null, (e: Error) => e);
      expect(caught.stack).toContain("testCase.test.ts");
    } finally {
      Q.longStackSupport = saved;
    }
  });
});