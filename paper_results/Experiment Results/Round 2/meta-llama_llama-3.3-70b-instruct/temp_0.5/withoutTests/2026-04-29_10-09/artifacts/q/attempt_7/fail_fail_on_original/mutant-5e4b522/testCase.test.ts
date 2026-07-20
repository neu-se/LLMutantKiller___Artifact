describe("Q", () => {
  it("should not create a global Q object when window is an empty string in the original code", () => {
    // @ts-ignore
    const originalWindow = global.window;
    // @ts-ignore
    const originalSelf = global.self;

    // @ts-ignore
    global.window = "";
    // @ts-ignore
    global.self = {};

    // @ts-ignore
    const Q = require("../../../../../../../../subject_repositories/q/q.js")();

    // @ts-ignore
    expect(global.Q).toBeUndefined();

    // @ts-ignore
    global.window = originalWindow;
    // @ts-ignore
    global.self = originalSelf;
  });
});