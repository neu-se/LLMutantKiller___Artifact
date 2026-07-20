const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.post mutation test", () => {
  it("should pass arguments correctly to dispatched post method", async () => {
    const obj = {
      testMethod: jest.fn((arg1: string, arg2: string) => arg1 + arg2)
    };

    const promise = Q(obj);
    const result = await promise.post("testMethod", ["hello", "world"]);

    expect(obj.testMethod).toHaveBeenCalledWith("hello", "world");
    expect(result).toBe("helloworld");
  });
});