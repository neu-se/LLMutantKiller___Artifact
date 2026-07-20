describe("Q nextTick isNodeJS default value", () => {
  it("does not use process.domain for tasks when not in Node.js environment", async () => {
    const origToString = process.toString;
    (process as any).toString = () => "[object Object]";

    jest.resetModules();
    let Q2: any;
    try {
      Q2 = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      (process as any).toString = origToString;
    }

    const enterCalls: number[] = [];
    const exitCalls: number[] = [];
    const mockDomain = {
      enter: () => enterCalls.push(1),
      exit: () => exitCalls.push(1),
    };

    // process.domain is getter-only, need Object.defineProperty
    const domainDescriptor = Object.getOwnPropertyDescriptor(process, 'domain');
    Object.defineProperty(process, 'domain', {
      value: mockDomain,
      configurable: true,
      writable: true,
    });

    try {
      await new Promise<void>((resolve) => {
        Q2.nextTick(() => resolve());
      });
    } finally {
      if (domainDescriptor) {
        Object.defineProperty(process, 'domain', domainDescriptor);
      } else {
        // delete the property to restore prototype lookup
        delete (process as any).domain;
      }
    }

    expect(enterCalls.length).toBe(0);
    expect(exitCalls.length).toBe(0);
  });
});