import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.keys", () => {
  it("should call dispatch with an empty array as args", async () => {
    const obj = { x: 1 };
    const promise = Q(obj);
    const capturedArgs: unknown[][] = [];
    const originalDispatch = promise.dispatch.bind(promise);
    promise.dispatch = function(op: string, args: unknown[]) {
      capturedArgs.push(args);
      return originalDispatch(op, args);
    };
    await promise.keys();
    expect(capturedArgs[0]).toEqual([]);
  });
});