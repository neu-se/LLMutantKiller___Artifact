import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should create a global Q object when window is not empty", () => {
    const originalWindow = global.window;
    const originalSelf = global.self;

    global.window = {};
    global.self = {};

    const q = Q;

    expect(global.Q).toBeDefined();

    global.window = originalWindow;
    global.self = originalSelf;
  });
});