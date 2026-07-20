import { describe, it, expect } from "@jest/globals";

describe("Q MessageChannel setup", () => {
  it("should call port2.postMessage when MessageChannel is available, not leave requestTick undefined", async () => {
    let port2PostMessageCalled = false;
    let port1Handler: Function | null = null;
    
    const mockChannel = {
      port1: {
        set onmessage(fn: Function) { port1Handler = fn; },
        get onmessage() { return port1Handler; }
      },
      port2: {
        postMessage: (_: any) => { port2PostMessageCalled = true; }
      }
    };
    
    (global as any).MessageChannel = function() { return mockChannel; };
    
    jest.resetModules();
    
    let Q: any;
    try {
      Q = (await import("../../../../../../../../../../../subject_repositories/q/q.js")).default;
    } finally {
      delete (global as any).MessageChannel;
    }
    
    // Original: requestTick is set to a function that calls setTimeout + port2.postMessage(0)
    // Mutated: requestTick is undefined (void 0), calling it throws TypeError
    
    let threwError = false;
    try {
      Q.nextTick(() => {});
    } catch(e) {
      threwError = true;
    }
    
    expect(threwError).toBe(false);
    expect(port2PostMessageCalled).toBe(true);
  });
});