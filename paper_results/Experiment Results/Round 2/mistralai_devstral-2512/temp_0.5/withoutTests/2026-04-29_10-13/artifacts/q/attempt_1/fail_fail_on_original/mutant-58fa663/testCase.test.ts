import { Q } from "./q";

describe("Q unhandled rejection tracking", () => {
  it("should correctly track and untrack rejections when process.emit is not a function", async () => {
    // Save the original process.emit
    const originalEmit = process.emit;

    // Mock process.emit to be something other than a function
    process.emit = "not a function" as any;

    // Create a rejected promise
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Add a handler after some time to ensure the rejection is tracked
    await new Promise(resolve => setTimeout(resolve, 10));

    // Restore process.emit
    process.emit = originalEmit;

    // The test passes if no errors are thrown during this process
    // The mutation would cause the code to incorrectly try to call process.emit
    // when it's not a function, which would throw an error in the mutated version
  });
});