import { dispatch } from "./q.js";

describe("dispatch function", () => {
  it("should return a promise when called with valid arguments", () => {
    const testObject = {
      testMethod: function() {
        return "success";
      }
    };
    const result = dispatch(testObject, "testMethod", []);
    expect(result).toBeDefined();
    expect(typeof result.then).toBe("function");
  });
});