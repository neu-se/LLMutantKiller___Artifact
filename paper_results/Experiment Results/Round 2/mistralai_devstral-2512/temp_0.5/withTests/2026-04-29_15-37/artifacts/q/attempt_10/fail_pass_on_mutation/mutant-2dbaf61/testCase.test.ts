import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace capture", () => {
  it("should capture stack traces when errors are thrown", () => {
    const error = new Error("Test error");
    const promise = Q.reject(error);
    return promise.then(
      () => {
        throw new Error("Should not reach here");
      },
      (e: Error) => {
        expect(e.stack).toBeDefined();
        expect(e.stack).toContain("Test error");
        expect(e.stack).toMatch(/Error:\s*Test error\s*(\n\s*at\s.*)+/);
        expect(e.stack.split('\n').length).toBeGreaterThan(1);
      }
    );
  });
});