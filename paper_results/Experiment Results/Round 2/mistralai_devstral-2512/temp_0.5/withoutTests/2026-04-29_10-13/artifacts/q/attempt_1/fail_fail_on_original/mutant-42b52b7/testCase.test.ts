import { Q } from "./q";

describe("Q unhandled rejection tracking", () => {
  it("should emit unhandledRejection event when process.emit is available", (done) => {
    // Create a mock process.emit function to track calls
    const originalEmit = process.emit;
    const emitCalls: Array<{ event: string, args: any[] }> = [];

    // Override process.emit to track calls
    process.emit = function(event: string, ...args: any[]) {
      emitCalls.push({ event, args });
      return originalEmit.apply(this, [event, ...args]);
    };

    // Create a rejected promise that won't be handled
    const rejectedPromise = Q.reject(new Error("Test rejection"));

    // Wait for the event loop to process the unhandled rejection
    setTimeout(() => {
      // Restore original emit
      process.emit = originalEmit;

      // Check if unhandledRejection event was emitted
      const unhandledRejection = emitCalls.find(call => call.event === "unhandledRejection");
      expect(unhandledRejection).toBeDefined();
      expect(unhandledRejection?.args[0]).toBeInstanceOf(Error);
      expect((unhandledRejection?.args[0] as Error).message).toBe("Test rejection");

      done();
    }, 50);
  });
});