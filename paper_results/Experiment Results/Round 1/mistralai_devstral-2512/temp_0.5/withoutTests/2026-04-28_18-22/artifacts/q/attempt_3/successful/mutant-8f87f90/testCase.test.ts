const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise post method", () => {
  it("should correctly invoke method with arguments when name is provided", async () => {
    const obj = {
      testMethod: jest.fn().mockReturnValue("success")
    };

    const promise = Q(obj);
    const result = await promise.post("testMethod", ["arg1", "arg2"]);

    expect(obj.testMethod).toHaveBeenCalledWith("arg1", "arg2");
    expect(result).toBe("success");
  });
});