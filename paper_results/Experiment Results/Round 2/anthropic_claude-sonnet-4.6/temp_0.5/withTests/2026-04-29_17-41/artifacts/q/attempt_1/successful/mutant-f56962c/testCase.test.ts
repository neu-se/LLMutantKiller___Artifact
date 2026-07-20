import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.fcall", () => {
  it("should fulfill a promise by calling the function with the provided arguments", async () => {
    const fn = Q(function (a: number, b: number, c: number) {
      return a + b + c;
    });

    const result = await fn.fcall(1, 2, 3);
    expect(result).toEqual(6);
  });
});