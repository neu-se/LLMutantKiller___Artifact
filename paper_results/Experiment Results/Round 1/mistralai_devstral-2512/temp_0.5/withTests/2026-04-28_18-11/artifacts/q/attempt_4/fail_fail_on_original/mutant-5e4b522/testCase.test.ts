// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library browser environment detection", () => {
  let originalWindow: any;
  let originalSelf: any;

  beforeAll(() => {
    // Save original window and self
    originalWindow = global.window;
    originalSelf = global.self;
  });

  afterAll(() => {
    // Restore original window and self
    global.window = originalWindow;
    global.self = originalSelf;
    // Clean up Q global if it was set
    if ((global as any).Q) {
      delete (global as any).Q;
    }
  });

  it("should correctly detect browser environment when window is defined", () => {
    // Simulate browser environment
    (global as any).window = {};
    (global as any).self = {};

    // Clear require cache and reload Q to test initialization
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify Q was initialized as a global
    expect(typeof (global as any).Q).toBe("function");

    // Verify basic Q functionality
    const deferred = (global as any).Q.defer();
    expect(typeof deferred.resolve).toBe("function");
    expect(typeof deferred.reject).toBe("function");

    // Test promise creation
    const promise = (global as any).Q.resolve(42);
    return promise.then((value: number) => {
      expect(value).toBe(42);
    });
  });
});