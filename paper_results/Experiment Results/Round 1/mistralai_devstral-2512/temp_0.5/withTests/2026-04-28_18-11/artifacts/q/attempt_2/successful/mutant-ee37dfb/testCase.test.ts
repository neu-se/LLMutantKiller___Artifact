import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.post", () => {
  it("should fulfill a promise when post is called with a method name and arguments", async () => {
    const subject = {
      a: function (value: number) {
        return 1 + value;
      }
    };
    const promise = Q(subject);
    const result = await promise.post("a", [1]);
    expect(result).toBe(2);
  });
});