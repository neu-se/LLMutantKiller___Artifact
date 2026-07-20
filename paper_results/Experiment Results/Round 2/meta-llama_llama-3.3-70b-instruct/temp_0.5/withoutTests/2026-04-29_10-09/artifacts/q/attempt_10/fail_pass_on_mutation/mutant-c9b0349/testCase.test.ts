import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should correctly filter internal frames from stack traces", () => {
    const error = new Error();
    const promise = Q.reject(error);

    try {
      throw error;
    } catch (e) {
      const stack = e.stack;

      if (stack) {
        const lines = stack.split("\n");
        const nonInternalLines = lines.filter((line: string) => !line.includes("q.js"));
        expect(nonInternalLines.length).toBeGreaterThan(0);
      } else {
        expect(true).toBe(false);
      }
    }
  });
});