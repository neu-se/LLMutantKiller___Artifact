import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should create a global Q object when run in a browser environment", () => {
    // @ts-ignore
    const originalWindow = global.window;
    // @ts-ignore
    const originalSelf = global.self;

    // @ts-ignore
    global.window = {};
    // @ts-ignore
    global.self = {};

    const q = Q;

    // @ts-ignore
    expect(global.Q).toBeDefined();

    // @ts-ignore
    global.window = originalWindow;
    // @ts-ignore
    global.self = originalSelf;
  });

  it("should not create a global Q object when window is undefined", () => {
    // @ts-ignore
    const originalWindow = global.window;
    // @ts-ignore
    const originalSelf = global.self;

    // @ts-ignore
    global.window = undefined;
    // @ts-ignore
    global.self = undefined;

    const q = Q;

    // @ts-ignore
    expect(global.Q).toBeUndefined();

    // @ts-ignore
    global.window = originalWindow;
    // @ts-ignore
    global.self = originalSelf;
  });
});