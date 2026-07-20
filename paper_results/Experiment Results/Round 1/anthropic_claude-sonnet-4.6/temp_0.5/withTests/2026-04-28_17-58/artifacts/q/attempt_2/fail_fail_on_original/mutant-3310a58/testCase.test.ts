describe("Q longStackSupport guard", () => {
  it("should not throw when process is null during module initialization", () => {
    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[qPath];

    const originalProcess = global.process;
    (global as any).process = null;

    let threw = false;
    try {
      require(qPath);
    } catch (e) {
      threw = true;
    } finally {
      (global as any).process = originalProcess;
      delete require.cache[qPath];
    }

    // Original code: typeof null === "object" is true, but `null` is falsy,
    // so `typeof process === "object" && process` short-circuits safely.
    // Mutated code: `true && process.env` throws TypeError on null.process.env
    expect(threw).toBe(false);
  });
});