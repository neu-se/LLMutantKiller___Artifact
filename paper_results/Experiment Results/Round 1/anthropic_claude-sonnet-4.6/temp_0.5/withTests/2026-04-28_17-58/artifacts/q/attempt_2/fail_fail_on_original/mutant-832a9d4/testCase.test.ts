import { createRequire } from "module";
import { Module } from "module";

describe("Q MessageChannel requestTick branch", () => {
  it("should set up requestTick correctly when MessageChannel is available and setImmediate is not a function", (done) => {
    // Save originals
    const originalSetImmediate = (global as any).setImmediate;
    const originalMessageChannel = (global as any).MessageChannel;
    const originalProcess = global.process;

    // Remove setImmediate so the MessageChannel branch is reached
    delete (global as any).setImmediate;

    // Provide a mock MessageChannel
    let port1Handler: (() => void) | null = null;
    let port2PostMessageCalled = false;

    (global as any).MessageChannel = function () {
      return {
        port1: {
          set onmessage(handler: () => void) {
            port1Handler = handler;
          }
        },
        port2: {
          postMessage: (_msg: any) => {
            port2PostMessageCalled = true;
          }
        }
      };
    };

    // Clear require cache so Q re-initializes
    const require = createRequire(import.meta.url);
    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[qPath];

    let Q: any;
    try {
      Q = require(qPath);
    } finally {
      // Restore
      (global as any).setImmediate = originalSetImmediate;
      (global as any).MessageChannel = originalMessageChannel;
    }

    // Now use Q - if requestTick is undefined, calling nextTick will throw
    let error: Error | null = null;
    try {
      Q.nextTick(function () {});
    } catch (e: any) {
      error = e;
    }

    expect(error).toBeNull();
    expect(port2PostMessageCalled).toBe(true);
    done();
  });
});