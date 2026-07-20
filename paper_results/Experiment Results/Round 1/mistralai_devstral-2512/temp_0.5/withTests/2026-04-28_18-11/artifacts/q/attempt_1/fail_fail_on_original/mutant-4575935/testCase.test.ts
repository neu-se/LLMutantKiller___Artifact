// Test to detect the mutation in q.js where the window/self check is replaced with `false`
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library browser environment detection", () => {
  it("should expose Q as a global when running in a browser-like environment", () => {
    // Simulate a browser-like environment by setting globalThis.window
    const originalWindow = globalThis.window;
    const originalSelf = globalThis.self;

    // Create a mock browser environment
    globalThis.window = {} as any;
    globalThis.self = {} as any;

    // Clear any existing Q global and reload the module
    delete (globalThis as any).Q;
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const { Q: FreshQ } = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify Q is now available as a global
    expect((globalThis as any).Q).toBeDefined();
    expect((globalThis as any).Q).toBe(FreshQ);

    // Clean up
    globalThis.window = originalWindow;
    globalThis.self = originalSelf;
    delete (globalThis as any).Q;
  });
});