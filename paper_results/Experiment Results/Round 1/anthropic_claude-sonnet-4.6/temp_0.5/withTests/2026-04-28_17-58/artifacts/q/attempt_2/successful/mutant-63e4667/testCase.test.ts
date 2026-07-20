import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.keys", () => {
  it("should dispatch keys with an empty args array", async () => {
    const obj = { x: 1 };
    const promise = Q(obj);
    const originalDispatch = promise.dispatch.bind(promise);
    let capturedArgs: any[] | undefined;
    
    (promise as any).dispatch = function(op: string, args: any[]) {
      if (op === "keys") {
        capturedArgs = args;
      }
      return originalDispatch(op, args);
    };

    await (promise as any).keys();
    expect(capturedArgs).toEqual([]);
  });
});