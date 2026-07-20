describe("Q MessageChannel branch detection", () => {
  it("detects original vs mutated by checking if requestTick works when only MessageChannel is available", () => {
    // Save originals
    const origSetImmediate = (global as any).setImmediate;
    const origMessageChannel = (global as any).MessageChannel;

    // Force the MessageChannel branch by removing setImmediate
    Object.defineProperty(global, "setImmediate", {
      value: undefined,
      writable: true,
      configurable: true
    });

    let postMessageCalled = false;
    const mockChannel = {
      port1: { onmessage: null as any },
      port2: { postMessage: () => { postMessageCalled = true; } }
    };
    Object.defineProperty(global, "MessageChannel", {
      value: function() { return mockChannel; },
      writable: true,
      configurable: true
    });

    let Q: any;
    jest.isolateModules(() => {
      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    });

    // Restore
    Object.defineProperty(global, "setImmediate", {
      value: origSetImmediate,
      writable: true,
      configurable: true
    });
    Object.defineProperty(global, "MessageChannel", {
      value: origMessageChannel,
      writable: true,
      configurable: true
    });

    // Original: requestTick calls postMessage -> postMessageCalled = true
    // Mutated: requestTick is undefined -> throws TypeError
    let threw = false;
    try {
      Q.nextTick(() => {});
    } catch (e) {
      threw = true;
    }

    expect(threw).toBe(false);
    expect(postMessageCalled).toBe(true);
  });
});