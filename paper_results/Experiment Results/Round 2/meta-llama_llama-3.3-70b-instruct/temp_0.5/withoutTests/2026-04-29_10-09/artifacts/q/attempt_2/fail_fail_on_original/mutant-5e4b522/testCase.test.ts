import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should create a global Q object when run in a browser environment", () => {
    const originalWindow = global.window;
    const originalSelf = global.self;

    global.window = undefined;
    global.self = undefined;

    const q = Q;

    expect(global.Q).toBeDefined();

    global.window = originalWindow;
    global.self = originalSelf;
  });

  it("should not create a global Q object when run in a non-browser environment", () => {
    const originalWindow = global.window;
    const originalSelf = global.self;

    global.window = "";
    global.self = undefined;

    const q = Q;

    expect(global.Q).toBeUndefined();

    global.window = originalWindow;
    global.self = originalSelf;
  });
});