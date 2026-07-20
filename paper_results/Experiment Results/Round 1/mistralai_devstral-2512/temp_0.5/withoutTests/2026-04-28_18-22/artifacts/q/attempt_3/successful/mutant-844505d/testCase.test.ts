const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done() with domain handling", () => {
  it("should use process.domain when available", (done) => {
    // This test verifies that Q.done() properly uses process.domain when it exists
    // The mutation changes the condition from checking process.domain to always false
    const mockDomain = {
      bind: jest.fn((fn) => fn),
      enter: jest.fn(),
      exit: jest.fn()
    };

    // Mock process.domain
    const originalProcess = { ...process };
    (global as any).process = {
      ...process,
      domain: mockDomain
    };

    const promise = Q.resolve("test");
    promise.done(() => {
      // Verify that domain.bind was called
      expect(mockDomain.bind).toHaveBeenCalled();

      // Restore original process
      (global as any).process = originalProcess;
      done();
    });
  });
});