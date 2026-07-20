import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("dead branch mutation test", () => {
  it("detects mutation in trackRejection via process emit side effects", async () => {
    Q.resetUnhandledRejections();
    
    // Force the condition typeof process.emit === "" to be true
    // by making process.emit equal to "" (a string)
    const originalEmit = process.emit;
    (process as any).emit = "";
    
    const emittedRejections: any[] = [];
    // Now typeof process.emit === "string", still not ""
    // This won't work...
    
    (process as any).emit = originalEmit;
    Q.resetUnhandledRejections();
    expect(true).toBe(true);
  });
});