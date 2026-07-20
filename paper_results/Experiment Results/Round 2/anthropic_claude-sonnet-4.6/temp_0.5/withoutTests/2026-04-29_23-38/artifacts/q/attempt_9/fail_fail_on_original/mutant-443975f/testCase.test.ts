import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q setImmediate branch detection", () => {
  it("Q tasks are controlled by legacy fake timers setImmediate", () => {
    jest.useFakeTimers({ legacyFakeTimers: true });

    let resolved = false;
    Q.resolve(42).then(() => { resolved = true; });

    expect(resolved).toBe(false);
    jest.runAllImmediates();
    expect(resolved).toBe(true);

    jest.useRealTimers();
  });
});