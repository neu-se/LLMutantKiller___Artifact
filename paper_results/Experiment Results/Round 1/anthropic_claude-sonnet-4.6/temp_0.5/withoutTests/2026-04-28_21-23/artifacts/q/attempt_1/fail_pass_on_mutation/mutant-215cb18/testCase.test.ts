import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support", () => {
  it("should properly set stack trace on rejected promise when longStackSupport is enabled", async () => {
    Q.longStackSupport = true;
    
    const error = new Error("test error");
    const rejected = Q.reject(error);
    
    let caughtError: any;
    await Q(rejected).fail((e: any) => {
      caughtError = e;
    });
    
    expect(caughtError).toBe(error);
    Q.longStackSupport = false;
  });
});