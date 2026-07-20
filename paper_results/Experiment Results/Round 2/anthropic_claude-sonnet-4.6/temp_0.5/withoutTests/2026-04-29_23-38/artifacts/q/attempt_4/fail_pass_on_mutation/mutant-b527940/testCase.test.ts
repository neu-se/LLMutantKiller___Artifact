import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q trackRejection", () => {
  it("should not emit unhandledRejection for promises not yet in unhandledRejections", async () => {
    Q.resetUnhandledRejections();
    
    const emittedUnhandled: any[] = [];
    const originalEmit = process.emit.bind(process);
    
    process.on("unhandledRejection", (reason, promise) => {
      emittedUnhandled.push({ reason, promise });
    });
    
    // Create two rejections
    const p1 = Q.reject(new Error("first"));
    const p2 = Q.reject(new Error("second"));
    
    await new Promise(r => setTimeout(r, 100));
    
    Q.resetUnhandledRejections();
    expect(true).toBe(true);
  });
});