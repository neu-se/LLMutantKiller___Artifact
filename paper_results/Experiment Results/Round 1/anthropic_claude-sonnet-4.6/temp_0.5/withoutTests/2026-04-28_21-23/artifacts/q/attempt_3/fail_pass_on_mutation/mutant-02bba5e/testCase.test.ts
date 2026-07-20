import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong null error mutation", () => {
  it("should not throw when rejection reason is null and longStackSupport is enabled", async () => {
    Q.longStackSupport = true;
    
    let caughtReason: any = "not-set";
    
    await new Promise<void>((resolve) => {
      Q.reject(null)
        .then(undefined, (reason: any) => {
          caughtReason = reason;
          resolve();
        })
        .done();
    });

    Q.longStackSupport = false;
    
    expect(caughtReason).toBeNull();
  });
});