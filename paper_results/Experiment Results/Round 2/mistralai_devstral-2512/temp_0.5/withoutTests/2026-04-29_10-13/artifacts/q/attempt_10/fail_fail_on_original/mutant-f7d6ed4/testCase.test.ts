const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.done() with process.domain", () => {
  it("should correctly evaluate process.domain condition with undefined process", (done) => {
    // Create a mock domain
    const mockDomain = {
      bind: jest.fn((fn: Function) => fn),
      enter: jest.fn(),
      exit: jest.fn()
    };

    // Store original process
    const originalProcess = global.process;

    try {
      // Set process to undefined (falsy) but add domain property to global
      global.process = undefined;
      (global as any).domain = mockDomain;

      const promise = Q.resolve("test");
      promise.done(() => {
        // In the original code, this should NOT call domain.bind because process is undefined
        // In the mutated code, this WILL call domain.bind because of the changed condition
        expect(mockDomain.bind).not.toHaveBeenCalled();
        done();
      });
    } catch (error) {
      done(error);
    } finally {
      global.process = originalProcess;
      delete (global as any).domain;
    }
  });
});