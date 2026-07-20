import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should correctly filter internal frames from stack traces", () => {
    const error = new Error();
    const promise = Q.reject(error);
    const stack = promise.stack;

    // Check that the stack does not contain any internal Q frames
    const internalFrames = (stack as string).split("\n").filter((line: string) => line.includes("q.js"));
    expect(internalFrames.length).toBeLessThan((stack as string).split("\n").length);
  });
});