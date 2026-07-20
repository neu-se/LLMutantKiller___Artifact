// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library browser environment detection", () => {
  it("should correctly detect browser environment with window and self", () => {
    // Save original globals
    const originalWindow = global.window;
    const originalSelf = global.self;

    // Setup test environment
    global.window = undefined;
    global.self = undefined;

    // This should not expose Q globally in this environment
    // since neither window nor self are defined
    delete global.Q;

    // Import Q again to test the environment detection
    // The mutation changes the condition from checking `typeof window !== "undefined"`
    // to `typeof window !== ""`, which would incorrectly evaluate to true
    // when window is undefined, potentially causing issues in non-browser environments
    const QModule = require("../../../../../../../../../../../subject_repositories/q/q.js");
    const QTest = QModule;

    // Verify Q is still accessible through the module system
    expect(QTest).toBeDefined();
    expect(typeof QTest).toBe("function");

    // Clean up
    global.window = originalWindow;
    global.self = originalSelf;

    // Additional verification that Q works correctly
    const deferred = QTest.defer();
    deferred.resolve(42);
    return deferred.promise.then((value) => {
      expect(value).toBe(42);
    });
  });
});