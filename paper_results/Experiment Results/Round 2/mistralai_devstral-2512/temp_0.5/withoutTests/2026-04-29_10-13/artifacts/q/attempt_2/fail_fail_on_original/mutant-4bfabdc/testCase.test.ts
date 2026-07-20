import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q stack trace filtering", () => {
  it("should correctly filter internal frames from stack traces", () => {
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      const promise = Q.reject(new Error("Test error"));
      return promise.then(
        () => {},
        (error: Error) => {
          const stack = error.stack || "";
          expect(stack.includes("at Promise")).toBe(false);
          expect(stack.includes("at defer")).toBe(false);
          expect(stack.includes("at Q.reject")).toBe(false);
        }
      );
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});