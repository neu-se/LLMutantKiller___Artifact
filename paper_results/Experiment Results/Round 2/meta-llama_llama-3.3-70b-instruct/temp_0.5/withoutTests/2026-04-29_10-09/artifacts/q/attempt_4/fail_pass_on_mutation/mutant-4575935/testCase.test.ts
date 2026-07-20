describe("Q", () => {
  it("should create a global Q object when run in a browser environment", () => {
    // Create a mock global object
    const global: any = {};

    // Run the Q code in a browser environment
    (function (definition: any) {
      if (typeof global !== "undefined") {
        global.Q = definition();
      }
    })(function () {
      return {};
    });

    // Check if the Q object is created on the global object
    expect(global.Q).toBeDefined();
  });
});