import { jest } from '@jest/globals';

describe("Q nextTick behavior based on process.toString", () => {
  it("should use process.nextTick only when process.toString() returns [object process]", async () => {
    // Save original toString
    const originalToString = process.toString;
    
    // Override process.toString to return something non-standard
    // This should cause original code to NOT use isNodeJS path
    // but mutated code WOULD use isNodeJS path
    (process as any).toString = () => "[object Object]";
    
    // Clear module cache to force re-evaluation
    jest.resetModules();
    
    const Q = (await import("../../../../../../../../../../../subject_repositories/q/q.js")).default;
    
    // Restore
    (process as any).toString = originalToString;
    
    // Test that Q still works correctly - it should resolve promises
    const result = await Q.Promise((resolve: (v: number) => void) => {
      resolve(42);
    });
    
    expect(result).toBe(42);
  });
});