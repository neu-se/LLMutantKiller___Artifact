import { Q } from "./q.js";

describe("Q stack trace filtering", () => {
  it("should filter out Node.js internal frames from stack traces", async () => {
    // Create a promise chain that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    // Add a handler that will be in the stack trace
    const result = await promise
      .catch((error) => {
        // The stack trace should not contain Node.js internal frames
        expect(error.stack).not.toContain("(node.js:");
        return "recovered";
      });

    expect(result).toBe("recovered");
  });
});