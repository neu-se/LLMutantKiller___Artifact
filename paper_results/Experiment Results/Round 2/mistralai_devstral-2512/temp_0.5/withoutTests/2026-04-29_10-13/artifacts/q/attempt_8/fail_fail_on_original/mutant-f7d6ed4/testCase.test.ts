const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.done() with process.domain", () => {
  it("should correctly evaluate process.domain condition with falsy process", (done) => {
    // Create a mock process object that is falsy but has domain
    const mockDomain = {
      bind: jest.fn((fn: Function) => fn),
      enter: jest.fn(),
      exit: jest.fn()
    };

    // This creates a process object that is falsy (null) but has domain property
    // This tests the mutation where the condition changes from:
    // if (typeof process === "object" && process && process.domain)
    // to:
    // if (typeof process === "object" && process || process.domain)
    const mockProcess = Object.create(null);
    mockProcess.domain = mockDomain;
    mockProcess.nextTick = (fn: Function) => setTimeout(fn, 0);
    mockProcess.toString = () => "[object process]";

    // Make process falsy by setting it to null but with domain property
    const originalProcess = global.process;
    (global as any).process = null;
    Object.defineProperty(global, 'process', {
      value: mockProcess,
      writable: true,
      enumerable: true,
      configurable: true
    });

    try {
      const promise = Q.resolve("test");
      promise.done(() => {
        // In the original code, this should NOT call domain.bind because process is falsy
        // In the mutated code, this WILL call domain.bind because of the changed condition
        expect(mockDomain.bind).not.toHaveBeenCalled();
        done();
      });
    } catch (error) {
      done(error);
    } finally {
      global.process = originalProcess;
    }
  });
});