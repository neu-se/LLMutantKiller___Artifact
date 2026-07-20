import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module browser environment handling", () => {
  it("should export a working Q function via CommonJS in Node.js environment", () => {
    // In Node.js, the CommonJS branch is taken (exports and module are defined)
    // The mutation changes the browser branch from checking window/self to false
    // This test verifies the module loads correctly and Q.noConflict throws
    // the expected error (indicating CommonJS branch was taken, not browser branch)
    
    // Verify Q is properly loaded via CommonJS
    expect(typeof Q).toBe("function");
    
    // In CommonJS mode, noConflict should throw because it's not in global scope
    expect(() => Q.noConflict()).toThrow("Q.noConflict only works when Q is used as a global");
    
    // Verify basic Q functionality works
    const result = Q(42);
    expect(Q.isPromise(result)).toBe(true);
    
    // The key test: verify the module definition function works correctly
    // by testing that Q was loaded (not thrown as "environment not anticipated")
    expect(Q.resolve).toBeDefined();
    expect(Q.reject).toBeDefined();
    expect(Q.defer).toBeDefined();
    
    // Test that a fulfilled promise works correctly
    return Q(42).then((value: number) => {
      expect(value).toBe(42);
    });
  });
});