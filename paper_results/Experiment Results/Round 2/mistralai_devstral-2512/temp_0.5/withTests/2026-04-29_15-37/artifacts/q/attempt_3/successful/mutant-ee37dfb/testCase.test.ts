const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.prototype.post", () => {
  it("should fulfill a promise when calling post on a promise for an object with a method", async () => {
    const subject = {
      a: function (value: number) {
        return 1 + value;
      }
    };
    const result = await Q(subject).post("a", [1]);
    expect(result).toBe(2);
  });
});