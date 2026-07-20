describe("Q", () => {
  it("should create a global Q object when window is not an empty string", () => {
    // @ts-ignore
    const originalWindow = global.window;
    // @ts-ignore
    const originalSelf = global.self;

    // @ts-ignore
    global.window = {};
    // @ts-ignore
    global.self = {};

    // @ts-ignore
    const Q = require("../../../../../../../../subject_repositories/q/q.js")();

    // @ts-ignore
    expect(global.Q).toBeDefined();

    // @ts-ignore
    global.window = originalWindow;
    // @ts-ignore
    global.self = originalSelf;
  });
});