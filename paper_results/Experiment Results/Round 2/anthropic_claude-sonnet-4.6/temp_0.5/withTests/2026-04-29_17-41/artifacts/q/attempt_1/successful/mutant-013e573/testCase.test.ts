import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("npost with null args", () => {
  it("should call npost with null args and not include extra arguments", async () => {
    const obj = {
      method: function (callback: Function) {
        // This method expects exactly 1 argument (the callback)
        // If mutation adds "Stryker was here" as an extra arg, the callback
        // will be called with the wrong arguments
        const argCount = arguments.length;
        callback(null, argCount);
      }
    };

    const result = await Q(obj).npost("method", null);
    // With original code: args = [], so method gets [callback] -> 1 argument
    // With mutated code: args = ["Stryker was here"], so method gets ["Stryker was here", callback] -> 2 arguments
    expect(result).toBe(1);
  });
});