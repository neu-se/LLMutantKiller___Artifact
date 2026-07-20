import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.fcall", () => {
  it("should invoke the promised function with the provided arguments", async () => {
    const add = function (a: number, b: number) {
      return a + b;
    };

    const result = await Q(add).fcall(3, 4);
    expect(result).toBe(7);
  });
});