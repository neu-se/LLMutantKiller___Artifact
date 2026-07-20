import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.makePromise inspect state", () => {
  it("when inspect returns rejected state, the promise should be rejected", () => {
    const reason = new Error("test reason");
    let callCount = 0;
    
    const p = Q.makePromise(
      {
        "when": function(rejected: any) {
          if (rejected) return rejected(reason);
          return this;
        }
      },
      function fallback(this: any) { return this; },
      function inspect() {
        callCount++;
        return { state: "rejected", reason: reason };
      }
    );
    
    // The inspect function should report rejected state
    const result = p.inspect();
    expect(result.state).toBe("rejected");
    expect((result as any).reason).toBe(reason);
    
    // With original: exception only set if inspected.state === "rejected" (inside if(false))
    // With mutated: exception always set (inside if(false))  
    // Both are dead code, so exception should be undefined
    expect((p as any).exception).toBeUndefined();
  });
});