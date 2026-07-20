import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_defineProperty mutation detection", () => {
  it("should correctly define stack property on errors when long stack support is enabled and a rejection is handled", () => {
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    return new Promise<void>((resolve, reject) => {
      const error = new Error("test error");
      
      Q.reject(error)
        .then(
          () => {
            Q.longStackSupport = originalLongStackSupport;
            reject(new Error("Should not have fulfilled"));
          },
          (err: Error) => {
            Q.longStackSupport = originalLongStackSupport;
            // If object_defineProperty is `false`, calling it would throw a TypeError
            // and the rejection handler would not be called normally.
            // The error should have a stack property defined on it.
            expect(err).toBe(error);
            resolve();
          }
        );
    });
  });
});