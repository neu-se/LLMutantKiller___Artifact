const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.ninvoke mutation test", () => {
  it("should pass arguments correctly to the invoked method", async () => {
    const testObject = {
      testMethod: jest.fn((arg1: string, arg2: string) => {
        return arg1 + arg2;
      })
    };

    const result = await Q.ninvoke(testObject, "testMethod", "hello", "world");
    expect(result).toBe("helloworld");
    expect(testObject.testMethod).toHaveBeenCalledWith("hello", "world");
  });
});