import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle self being defined when window is undefined", () => {
        const originalWindow = global.window;
        const originalSelf = global.self;
        global.window = undefined;
        global.self = {};
        const q1 = Q();
        expect(q1).toBeDefined();
        global.self = undefined;
        expect(() => {
            const q2 = Q();
        }).toThrow();
        global.window = originalWindow;
        global.self = originalSelf;
    });
});