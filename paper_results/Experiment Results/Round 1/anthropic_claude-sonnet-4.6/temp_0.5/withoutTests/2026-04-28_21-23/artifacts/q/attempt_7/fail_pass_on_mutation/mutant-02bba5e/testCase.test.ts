import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q null rejection", () => {
  it("null rejection reason propagates to handler", async () => {
    jest.setTimeout(5000);
    
    let reason: any = "not-set";
    let handlerCalled = false;
    
    await new Promise<void>((resolve, reject) => {
      Q.reject(null).then(undefined, (r: any) => {
        handlerCalled = true;
        reason = r;
      }).then(resolve, reject);
    });
    
    expect(handlerCalled).toBe(true);
    expect(reason).toBeNull();
  });
});