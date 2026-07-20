import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("trackRejection && vs || mutation", () => {
  it("should not attempt to call process.emit when it is not a function", async () => {
    const originalEmit = process.emit;
    let errorThrown = false;
    
    (process as any).emit = "not_a_function";
    
    try {
      Q.reject(new Error("test"));
      await new Promise<void>(resolve => setTimeout(resolve, 50));
    } catch (e) {
      errorThrown = true;
    } finally {
      process.emit = originalEmit;
    }
    
    expect(errorThrown).toBe(false);
  });
});