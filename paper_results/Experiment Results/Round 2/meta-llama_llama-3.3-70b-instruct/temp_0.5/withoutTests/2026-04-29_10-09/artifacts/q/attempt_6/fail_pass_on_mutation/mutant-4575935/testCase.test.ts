describe("Q", () => {
  it("should create a global Q object when run in a browser environment", () => {
    // Create a mock global object
    const window: any = {};
    const self: any = {};

    // Run the Q code in a browser environment
    (function (definition: any) {
      if (typeof window !== "undefined" || typeof self !== "undefined") {
        var global: any = typeof window !== "undefined" ? window : self;
        global.Q = definition();
      }
    })(function () {
      return {};
    });

    // Check if the Q object is created on the global object
    expect(window.Q).toBeDefined();
    expect(Object.keys(window).length).toBe(1);
  });
});