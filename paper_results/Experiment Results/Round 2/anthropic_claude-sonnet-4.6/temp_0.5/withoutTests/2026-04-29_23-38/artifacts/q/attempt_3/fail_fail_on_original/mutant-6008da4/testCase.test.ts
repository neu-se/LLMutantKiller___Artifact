describe("Q nextTick isNodeJS default value", () => {
  it("does not use process.domain for tasks when not in Node.js environment", async () => {
    // Save and override process.toString so the Node.js environment check fails
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

    // Set process.domain before scheduling the task
    const origDomain = (process as any).domain;
    (process as any).domain = mockDomain;

    try {
      await new Promise<void>((resolve) => {
        Q2.nextTick(() => resolve());
      });
    } finally {
      (process as any).domain = origDomain;
    }

    // Original (isNodeJS=false): task stored with domain=false, enter/exit NOT called
    // Mutated (isNodeJS=true): task stored with domain=mockDomain, enter/exit CALLED
    expect(enterCalls.length).toBe(0);
    expect(exitCalls.length).toBe(0);
  });
});