import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.fcall", () => {
  it("should call the promised function with provided arguments and resolve with the return value", async () => {
    const fn = function (a: number, b: number) {
      return a + b;
    };

    const result = await Q(fn).fcall(3, 4);
    expect(result).toBe(7);
  });
});