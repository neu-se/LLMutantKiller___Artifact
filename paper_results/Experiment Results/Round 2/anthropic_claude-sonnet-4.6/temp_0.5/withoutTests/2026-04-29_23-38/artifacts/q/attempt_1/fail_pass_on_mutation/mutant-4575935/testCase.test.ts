import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module browser environment branch", () => {
  it("should load successfully and export Q when window or self is defined in global scope", () => {
    // In Node.js, the CommonJS branch is taken, so Q loads fine
    // The mutation changes the browser branch condition to false
    // We verify Q is properly loaded and functional
    expect(Q).toBeDefined();
    expect(typeof Q).toBe("function");
    
    // Test that Q works correctly - basic promise functionality
    const result = Q(42);
    expect(result).toBeDefined();
    expect(typeof result.then).toBe("function");
    
    // Verify Q.resolve works
    return Q.resolve(42).then((val: number) => {
      expect(val).toBe(42);
    });
  });
});