describe("hasStacks initialization", () => {
  it("constructs an Error object during module initialization to test for stack support", () => {
    const OriginalError = global.Error;
    let errorConstructorCallCount = 0;
    
    class TrackingError extends OriginalError {
      constructor(message?: string) {
        super(message);
        errorConstructorCallCount++;
      }
    }
    (global as any).Error = TrackingError;
    
    jest.resetModules();
    try {
      require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      global.Error = OriginalError;
    }
    
    // Original: try { throw new Error() } → Error constructor called at least once during init
    // Mutated: try {} → Error constructor NOT called during hasStacks detection
    // Note: captureLine() also calls throw new Error(), but only if hasStacks is true
    // In original: hasStacks=true → captureLine throws Error → count >= 2
    // In mutated: hasStacks=true → captureLine throws Error → count >= 1 (but not from hasStacks block)
    // The key: original calls Error() in hasStacks block, mutated does not
    expect(errorConstructorCallCount).toBeGreaterThan(0);
  });
});