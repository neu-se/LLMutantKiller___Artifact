import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should create a Q promise in a browser environment", () => {
        const global = typeof window!== "undefined"? window : globalThis;
        const originalWindow = global.window;
        const originalSelf = global.self;
        try {
            delete global.window;
            delete global.self;
            expect(() => {
                q(1);
            }).toThrow();
        } finally {
            global.window = originalWindow;
            global.self = originalSelf;
        }
    });
});