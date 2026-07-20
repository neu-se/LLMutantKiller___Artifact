const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.mapply mutation test", () => {
  it("should correctly dispatch with 'post' operation", async () => {
    const obj = {
      testMethod: function(arg1: string, arg2: string) {
        return arg1 + arg2;
      }
    };

    const result = await Q.mapply(obj, "testMethod", ["hello", "world"]);
    expect(result).toBe("helloworld");
  });
});