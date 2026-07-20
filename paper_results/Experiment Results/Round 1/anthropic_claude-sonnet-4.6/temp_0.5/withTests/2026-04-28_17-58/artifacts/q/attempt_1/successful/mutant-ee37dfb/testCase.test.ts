import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.post", () => {
  it("should invoke a method on the resolved object and return a promise for the result", async () => {
    const subject = {
      add: function (a: number, b: number) {
        return a + b;
      }
    };

    const result = await Q(subject).post("add", [3, 4]);
    expect(result).toBe(7);
  });
});