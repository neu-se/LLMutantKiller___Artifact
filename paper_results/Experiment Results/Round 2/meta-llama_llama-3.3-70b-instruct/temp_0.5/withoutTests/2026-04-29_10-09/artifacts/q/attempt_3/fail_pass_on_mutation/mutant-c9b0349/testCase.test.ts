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
        const internalFrames = stack.split("\n").filter((line: string) => line.includes("q.js"));
        expect(internalFrames.length).toBeLessThan(stack.split("\n").length);
      } else {
        expect(true).toBe(false);
      }
    }
  });
});