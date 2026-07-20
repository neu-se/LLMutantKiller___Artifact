import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("npost with null args", () => {
  it("should call npost with no args (null) and not include extra arguments", async () => {
    const obj = {
      method: function (callback: (err: null, result: number) => void) {
        // This method expects exactly one argument (the callback)
        // If mutant adds "Stryker was here" as an extra arg, arguments.length will be 2
        expect(arguments.length).toBe(1);
        callback(null, 42);
      }
    };

    const result = await Q(obj).npost("method", null);
    expect(result).toBe(42);
  });
});