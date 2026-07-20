import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.fcall", () => {
  it("should call the function with provided arguments and return a promise with the result", async () => {
    const add = (a: number, b: number) => a + b;
    const result = await Q.fcall(add, 3, 4);
    expect(result).toBe(7);
  });
});