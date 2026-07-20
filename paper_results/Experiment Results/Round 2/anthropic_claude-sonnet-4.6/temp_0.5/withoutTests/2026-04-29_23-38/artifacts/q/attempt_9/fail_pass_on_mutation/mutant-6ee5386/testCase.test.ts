import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q finally rejection path with threw tracking", () => {
  it("should re-throw original reason after finally callback resolves on rejected promise", async () => {
    const originalReason = new Error("original");
    const sideEffects: string[] = [];

    let caught: any = null;
    let resolved: any = undefined;

    try {
      resolved = await Q.reject(originalReason)
        ["finally"](function() {
          sideEffects.push("finally ran");
          // callback succeeds - returns undefined
        })
        .then(function(v: any) {
          sideEffects.push("then ran: " + v);
          return v;
        });
    } catch(e) {
      caught = e;
      sideEffects.push("caught: " + (e as Error).message);
    }

    expect(sideEffects).toContain("finally ran");
    expect(sideEffects).toContain("caught: original");
    expect(caught).toBe(originalReason);
    expect(resolved).toBeUndefined();
  });
});