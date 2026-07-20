import { Q } from "./q.js";

describe("Q.done() with process.domain", () => {
  it("should handle unhandled rejections correctly when process.domain exists", (done) => {
    // Create a mock process.domain to simulate Node.js domain behavior
    const mockDomain = {
      bind: jest.fn((fn) => fn),
      enter: jest.fn(),
      exit: jest.fn()
    };

    // Mock global process with domain
    const originalProcess = global.process;
    global.process = {
      domain: mockDomain,
      nextTick: setImmediate,
      emit: jest.fn()
    } as any;

    // Create a rejected promise that should trigger the unhandled rejection handler
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Use done() which should attach the unhandled rejection handler
    rejectedPromise.done();

    // Restore original process
    global.process = originalProcess;

    // Give time for async operations to complete
    setTimeout(() => {
      // Verify that domain.bind was called (which indicates the code path was taken)
      expect(mockDomain.bind).toHaveBeenCalled();
      done();
    }, 50);
  });
});