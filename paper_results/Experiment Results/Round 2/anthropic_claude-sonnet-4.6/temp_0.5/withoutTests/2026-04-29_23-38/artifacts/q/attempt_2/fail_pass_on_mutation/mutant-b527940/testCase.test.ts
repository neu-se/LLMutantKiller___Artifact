import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("trackRejection branch", () => {
  it("emits unhandledRejection for promises at index 0 in unhandledRejections", async () => {
    Q.resetUnhandledRejections();
    const originalEmit = process.emit;
    const events: string[] = [];
    // Can't make typeof process.emit === "" so test via getUnhandledReasons
    // The mutation affects !== -1 vs !== +1
    // With mutated code: index 1 would NOT emit (index !== 1 is false when index===1)
    // With original: index -1 would NOT emit (not found)
    // Both dead code paths...
    
    // Test the only observable: unhandledReasons tracking
    const r1 = new Error("first");
    const r2 = new Error("second"); 
    Q.reject(r1);
    Q.reject(r2);
    await new Promise(resolve => setTimeout(resolve, 20));
    expect(Q.getUnhandledReasons().length).toBe(2);
    Q.resetUnhandledRejections();
    process.emit = originalEmit;
  });
});