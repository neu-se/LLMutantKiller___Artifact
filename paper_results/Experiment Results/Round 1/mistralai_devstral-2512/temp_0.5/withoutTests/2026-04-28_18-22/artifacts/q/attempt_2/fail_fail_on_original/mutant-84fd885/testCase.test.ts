import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.ninvoke mutation test", () => {
  it("should pass arguments correctly to the dispatched method", async () => {
    const testObject = {
      testMethod: function(arg1: string, arg2: string, callback: (err: any, result?: any) => void) {
        callback(null, arg1 + arg2);
      }
    };

    const result = await Q.ninvoke(testObject, "testMethod", "hello", "world");
    expect(result).toBe("helloworld");
  });
});