import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.tap static method", () => {
  it("should reject when tap callback throws an error", async () => {
    const tapError = new Error("tap error");
    const callbackValues: number[] = [];

    let caught: any = null;
    try {
      await (Q as any).tap(Q.resolve(5), function(val: number) {
        callbackValues.push(val);
        throw tapError;
      });
    } catch(e) {
      caught = e;
    }

    expect(callbackValues).toEqual([5]);
    // With threw=true (original): error from tap propagates as rejection
    // With threw=false (mutated): error tracking broken, different behavior
    expect(caught).toBe(tapError);
  });
});