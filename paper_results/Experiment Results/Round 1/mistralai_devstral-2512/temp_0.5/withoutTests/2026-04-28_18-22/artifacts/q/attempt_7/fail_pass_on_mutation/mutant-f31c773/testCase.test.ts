const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.set mutation test", () => {
  it("should correctly dispatch with key and value parameters", async () => {
    const obj = { testProp: "original" };
    const promise = Q(obj);

    // Spy on the dispatch method to verify it's called with correct parameters
    const originalDispatch = promise.dispatch;
    let dispatchArgs: any[] = [];
    promise.dispatch = function(...args: any[]) {
      dispatchArgs = args;
      return originalDispatch.apply(this, args);
    };

    await promise.set("testProp", "newValue");

    // Verify dispatch was called with correct parameters
    expect(dispatchArgs[0]).toBe("set");
    expect(dispatchArgs[1]).toEqual(["testProp", "newValue"]);
    expect(obj.testProp).toBe("newValue");
  });
});