describe("Q uses MessageChannel when available", () => {
  it("constructs a MessageChannel instance during initialization when MessageChannel is global", () => {
    jest.resetModules();

    let constructed = false;

    // Provide a MessageChannel global before Q loads
    (global as any).MessageChannel = class {
      port1: { onmessage: any };
      port2: { postMessage: (v: any) => void };
      constructor() {
        constructed = true;
        this.port1 = { onmessage: null };
        this.port2 = { postMessage: () => {} };
      }
    };

    try {
      require("../../../../../../../../../../../subject_repositories/q/q.js");
      expect(constructed).toBe(true);
    } finally {
      delete (global as any).MessageChannel;
    }
  });
});