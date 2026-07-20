describe("Q uses MessageChannel when available", () => {
  it("constructs a MessageChannel instance during initialization when MessageChannel is global", () => {
    let constructed = false;

    (global as any).MessageChannel = class {
      port1: { onmessage: any };
      port2: { postMessage: (v: any) => void };
      constructor() {
        constructed = true;
        this.port1 = { onmessage: null };
        this.port2 = { postMessage: () => {} };
      }
    };

    jest.isolateModules(() => {
      require("../../../../../../../../../../../subject_repositories/q/q.js");
    });

    delete (global as any).MessageChannel;

    expect(constructed).toBe(true);
  });
});