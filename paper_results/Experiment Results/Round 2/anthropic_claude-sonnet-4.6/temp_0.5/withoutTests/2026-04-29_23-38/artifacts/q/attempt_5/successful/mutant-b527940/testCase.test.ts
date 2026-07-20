import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q unhandledRejection", () => {
  it("emits unhandledRejection for second rejected promise", async () => {
    Q.resetUnhandledRejections();
    
    const emittedPromises: any[] = [];
    const originalEmit = process.emit.bind(process);
    (process as any).emit = function(event: string, ...args: any[]) {
      if (event === "unhandledRejection") emittedPromises.push(args[1]);
      return originalEmit(event, ...args);
    };
    
    const p1 = Q.reject(new Error("first"));   // goes to index 0
    const p2 = Q.reject(new Error("second"));  // goes to index 1
    
    await new Promise(r => setTimeout(r, 100));
    
    (process as any).emit = originalEmit;
    Q.resetUnhandledRejections();
    
    // Original (index !== -1): both p1 (index 0) and p2 (index 1) emit → length 2
    // Mutated (index !== 1): p1 (index 0, 0!==1=true) emits, p2 (index 1, 1!==1=false) does NOT → length 1
    expect(emittedPromises.length).toBe(2);
    expect(emittedPromises).toContain(p1);
    expect(emittedPromises).toContain(p2);
  });
});