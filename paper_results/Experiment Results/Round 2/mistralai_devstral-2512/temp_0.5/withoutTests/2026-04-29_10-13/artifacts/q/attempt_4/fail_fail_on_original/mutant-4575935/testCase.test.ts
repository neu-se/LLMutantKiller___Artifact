describe("Q library global export behavior", () => {
  it("should expose Q as global in browser environment but not in Node.js", () => {
    // Save original environment
    const globalAny: any = global;
    const originalWindow = globalAny.window;
    const originalSelf = globalAny.self;
    const originalProcess = globalAny.process;

    // Test 1: Node.js environment (should not expose Q as global)
    delete globalAny.Q;
    delete globalAny.window;
    delete globalAny.self;
    globalAny.process = { title: "node" };

    require("../../../../../../../../../../../subject_repositories/q/q.js");
    expect(globalAny.Q).toBeUndefined();

    // Test 2: Browser environment (should expose Q as global)
    delete globalAny.Q;
    globalAny.window = {};
    globalAny.self = {};

    // Re-require to trigger browser path
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    require("../../../../../../../../../../../subject_repositories/q/q.js");
    expect(globalAny.Q).toBeDefined();
    expect(typeof globalAny.Q).toBe("function");

    // Cleanup
    globalAny.window = originalWindow;
    globalAny.self = originalSelf;
    globalAny.process = originalProcess;
    delete globalAny.Q;
  });
});