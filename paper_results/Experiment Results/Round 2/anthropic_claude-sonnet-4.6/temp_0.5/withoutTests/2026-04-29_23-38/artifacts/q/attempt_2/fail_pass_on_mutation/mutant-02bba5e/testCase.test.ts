import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong null error mutation", () => {
  it("should not throw when rejecting with null and longStackSupport is enabled", async () => {
    Q.longStackSupport = true;

    let handlerCalled = false;
    let receivedError: any = "NOT_SET";

    await new Promise<void>((resolve, reject) => {
      Q.reject(null)
        .then(undefined, function(err: any) {
          handlerCalled = true;
          receivedError = err;
          resolve();
        });
      
      // Give it time to process
      setTimeout(resolve, 100);
    });

    expect(handlerCalled).toBe(true);
    expect(receivedError).toBeNull();
  });
});