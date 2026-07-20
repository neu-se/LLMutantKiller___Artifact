import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle self being defined when window is undefined", () => {
        const originalWindow = globalThis.window;
        const originalSelf = globalThis.self;
        globalThis.window = undefined;
        globalThis.self = undefined;
        expect(() => {
            Q();
        }).toThrow();
        globalThis.window = originalWindow;
        globalThis.self = originalSelf;
    });
});