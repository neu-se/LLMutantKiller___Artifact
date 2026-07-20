describe("Q MessageChannel nextTick branch", () => {
  it("uses MessageChannel when available and not in standard Node.js environment", async () => {
    const originalProcess = global.process;
    const originalSetImmediate = (global as any).setImmediate;
    const originalMessageChannel = (global as any).MessageChannel;

    let channelCreated = false;

    (global as any).MessageChannel = class {
      port1: any = { onmessage: null };
      port2: any = { postMessage() {} };
      constructor() {
        channelCreated = true;
      }
    };

    delete (global as any).setImmediate;
    (global as any).process = { toString: () => "[object Object]", env: {} };

    jest.resetModules();

    try {
      await import("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      global.process = originalProcess;
      (global as any).setImmediate = originalSetImmediate;
      (global as any).MessageChannel = originalMessageChannel;
    }

    expect(channelCreated).toBe(true);
  });
});