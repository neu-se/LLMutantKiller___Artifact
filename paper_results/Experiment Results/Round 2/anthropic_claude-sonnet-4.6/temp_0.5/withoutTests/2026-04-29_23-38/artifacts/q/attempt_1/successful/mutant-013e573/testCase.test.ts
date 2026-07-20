import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.npost with no args", () => {
  it("should call the method with no extra arguments when args is undefined", async () => {
    const capturedArgs: any[] = [];
    const obj = {
      myMethod: function (...args: any[]) {
        capturedArgs.push(...args.slice(0, -1)); // exclude the callback
        const callback = args[args.length - 1];
        callback(null, "result");
      }
    };

    await Q.npost(obj, "myMethod", undefined);

    // When args is undefined, args || [] should produce [], so no extra args
    // When mutated, args || ["Stryker was here"] produces ["Stryker was here"]
    expect(capturedArgs.length).toBe(0);
  });
});