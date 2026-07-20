describe("Q uses MessageChannel when available", () => {
  it("constructs a MessageChannel instance during initialization when MessageChannel is global", () => {
    let constructed = false;

    const MockMC = class {
      port1: { onmessage: any };
      port2: { postMessage: (v: any) => void };
      constructor() {
        constructed = true;
        this.port1 = { onmessage: null };
        this.port2 = { postMessage: () => {} };
      }
    };

    (global as any).MessageChannel = MockMC;
    (globalThis as any).MessageChannel = MockMC;

    jest.isolateModules(() => {
      require("../../../../../../../../../../../subject_repositories/q/q.js");
    });

    delete (global as any).MessageChannel;
    delete (globalThis as any).MessageChannel;

    expect(constructed).toBe(true);
  });
});