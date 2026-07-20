// Test case to detect the mutation in the ninvoke method
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.ninvoke", () => {
  it("should invoke a method with arguments and return a promise for the result", async () => {
    const obj = {
      method: function(arg1: number, arg2: number) {
        return arg1 + arg2;
      }
    };

    const result = await Q(obj).ninvoke("method", 2, 3);
    expect(result).toBe(5);
  });
});