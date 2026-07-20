import { Q } from "./q.js";

describe("Q", () => {
    it("should create a global Q object when run in a browser environment", () => {
        const originalWindow = global.window;
        const originalSelf = global.self;

        global.window = { Q: undefined };
        global.self = { Q: undefined };

        Q;

        expect(global.Q).toBeDefined();

        global.window = originalWindow;
        global.self = originalSelf;
    });

    it("should not create a global Q object when run in a non-browser environment", () => {
        const originalWindow = global.window;
        const originalSelf = global.self;

        global.window = undefined;
        global.self = undefined;

        Q;

        expect(global.Q).toBeUndefined();

        global.window = originalWindow;
        global.self = originalSelf;
    });
});