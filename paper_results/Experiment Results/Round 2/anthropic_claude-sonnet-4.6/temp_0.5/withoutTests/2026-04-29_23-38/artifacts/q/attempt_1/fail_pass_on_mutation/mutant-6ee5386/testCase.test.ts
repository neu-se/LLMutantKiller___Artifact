import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.finally behavior when callback throws", () => {
  it("should reject with the callback error when the finally callback throws", async () => {
    const callbackError = new Error("callback error");
    
    // A fulfilled promise with a finally callback that throws
    const result = Q.resolve(42)["finally"](function () {
      throw callbackError;
    });

    let caught: Error | null = null;
    let resolved: any = null;

    try {
      resolved = await result;
    } catch (e) {
      caught = e as Error;
    }

    // The promise should be rejected with the callback error
    expect(caught).toBe(callbackError);
    expect(resolved).toBeNull();
  });
});