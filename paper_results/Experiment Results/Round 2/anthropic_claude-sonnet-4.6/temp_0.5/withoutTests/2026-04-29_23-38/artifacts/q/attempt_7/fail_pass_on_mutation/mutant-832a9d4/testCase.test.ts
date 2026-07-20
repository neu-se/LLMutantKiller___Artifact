describe("Q MessageChannel branch", () => {
  it("should set requestTick when MessageChannel is available and setImmediate is not", () => {
    const originalSetImmediate = (global as any).setImmediate;

    // Ensure MessageChannel is defined (it is in Node 15+)
    // and remove setImmediate to force MessageChannel branch
    delete (global as any).setImmediate;

    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[modulePath];
    const QReloaded = require(modulePath);

    // Restore immediately
    (global as any).setImmediate = originalSetImmediate;

    // With original: requestTick is set to setTimeout+postMessage function
    // With mutation: requestTick is undefined, nextTick() throws on first unflushed call
    // We need flushing=false, which it is on fresh module load
    let threw = false;
    try {
      QReloaded.nextTick(() => {});
    } catch (e) {
      threw = true;
    }

    expect(threw).toBe(false);
  });
});