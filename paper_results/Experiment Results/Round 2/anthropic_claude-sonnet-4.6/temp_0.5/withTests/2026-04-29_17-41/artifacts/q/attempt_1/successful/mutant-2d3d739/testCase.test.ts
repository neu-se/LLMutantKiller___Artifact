import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_defineProperty usage in long stack traces", () => {
  it("should successfully build long stack traces without throwing when longStackSupport is enabled", () => {
    Q.longStackSupport = true;

    return new Promise<void>((resolve, reject) => {
      function level1() {
        return Q().then(() => level2());
      }

      function level2() {
        return Q.reject(new Error("test error"));
      }

      level1().then(
        () => {
          Q.longStackSupport = false;
          reject(new Error("Expected rejection but got fulfillment"));
        },
        (err: Error) => {
          Q.longStackSupport = false;
          // In the original code, object_defineProperty works and the error
          // has a stack property set. In the mutated code, calling false() throws.
          expect(err).toBeDefined();
          expect(err.message).toBe("test error");
          resolve();
        }
      );
    });
  });
});