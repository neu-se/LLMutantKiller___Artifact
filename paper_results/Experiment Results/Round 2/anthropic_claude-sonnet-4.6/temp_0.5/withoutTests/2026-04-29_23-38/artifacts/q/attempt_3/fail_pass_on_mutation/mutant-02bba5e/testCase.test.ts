import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong null error mutation", () => {
  it("should correctly handle null rejection reason", async () => {
    // Disable longStackSupport so promise.stack is NOT set
    // This forces the code path through the second condition: typeof error === "object" && error !== null
    Q.longStackSupport = false;

    let rejectionHandlerCallCount = 0;
    let errorReceived: any = "NOT_SET";

    const result = await new Promise<string>((resolve) => {
      Q.reject(null)
        .then(undefined, function(err: any) {
          rejectionHandlerCallCount++;
          errorReceived = err;
          resolve("handler_called");
        })
        .then(undefined, function(err: any) {
          resolve("second_handler: " + err);
        });
    });

    // Original: makeStackTraceLong skips body (error !== null is false for null)
    //           rejection handler is called with null
    // Mutated:  makeStackTraceLong tries object_defineProperty(null,...) -> TypeError
    //           TypeError propagates, rejection handler may not be called with null
    expect(result).toBe("handler_called");
    expect(rejectionHandlerCallCount).toBe(1);
    expect(errorReceived).toBeNull();
  });
});