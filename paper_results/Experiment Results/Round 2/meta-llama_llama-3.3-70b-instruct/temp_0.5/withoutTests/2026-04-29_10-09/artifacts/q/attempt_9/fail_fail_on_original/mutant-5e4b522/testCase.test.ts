describe("Q", () => {
  it("should not create a global Q object when window is an empty string", () => {
    const originalWindow = global.window;
    const originalSelf = global.self;

    global.window = "";
    global.self = {};

    const Q = require("../../../../../../../../subject_repositories/q/q.js");

    expect(global.Q).toBeUndefined();

    global.window = originalWindow;
    global.self = originalSelf;
  });
});