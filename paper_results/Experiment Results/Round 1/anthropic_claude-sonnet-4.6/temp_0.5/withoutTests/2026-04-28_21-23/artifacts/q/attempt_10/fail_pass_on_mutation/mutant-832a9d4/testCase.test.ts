describe("Q mutation detection via nextTick behavior", () => {
  it("should resolve promises even when MessageChannel is natively available", (done) => {
    // In Node.js 15+, MessageChannel is globally available.
    // The mutation removes the MessageChannel setup code body,
    // leaving requestTick as undefined if MessageChannel is defined
    // AND setImmediate is not defined (which won't happen in Node.js).
    // 
    // Since setImmediate IS defined in Node.js, the setImmediate branch
    // runs in both original and mutated. The mutation only matters when
    // MessageChannel is defined but setImmediate is not.
    //
    // We test by removing setImmediate and using a real MessageChannel.

    const origSetImmediate = (global as any).setImmediate;
    Object.defineProperty(global, "setImmediate", {
      value: undefined,
      configurable: true,
      writable: true
    });

    // Use real MessageChannel if available, else skip
    if (typeof MessageChannel === "undefined") {
      Object.defineProperty(global, "setImmediate", {
        value: origSetImmediate,
        configurable: true,
        writable: true
      });
      done();
      return;
    }

    let Q: any;
    jest.isolateModules(() => {
      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    });

    Object.defineProperty(global, "setImmediate", {
      value: origSetImmediate,
      configurable: true,
      writable: true
    });

    // Original: requestTick uses MessageChannel, works fine
    // Mutated: requestTick is undefined, throws TypeError
    let threw = false;
    try {
      Q.nextTick(() => {});
    } catch (e) {
      threw = true;
    }

    expect(threw).toBe(false);
    done();
  });
});