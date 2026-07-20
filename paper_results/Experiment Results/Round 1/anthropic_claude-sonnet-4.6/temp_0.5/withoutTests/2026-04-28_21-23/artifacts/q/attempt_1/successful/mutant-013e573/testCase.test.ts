import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.npost with no args", () => {
  it("should call the method with no extra arguments when args is undefined", async () => {
    const receivedArgs: any[] = [];
    const obj = {
      method: function (...args: any[]) {
        // Capture all args except the last one (callback)
        const callback = args[args.length - 1];
        receivedArgs.push(...args.slice(0, -1));
        callback(null, "result");
      }
    };

    await Q(obj).npost("method", undefined);

    // In the original code, args || [] results in [], so no extra args are passed
    // In the mutated code, args || ["Stryker was here"] results in ["Stryker was here"],
    // so one extra arg would be passed before the callback
    expect(receivedArgs).toHaveLength(0);
  });
});