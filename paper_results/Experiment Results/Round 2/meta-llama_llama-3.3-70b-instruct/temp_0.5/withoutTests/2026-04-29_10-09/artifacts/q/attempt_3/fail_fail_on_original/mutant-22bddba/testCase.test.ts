import { Q } from "./q.js";

describe("Q", () => {
    it("should create a global Q object when run in a browser environment", () => {
        const originalWindow = (global as any).window;
        const originalSelf = (global as any).self;

        (global as any).window = {};
        (global as any).self = {};

        const q = Q;

        expect((global as any).Q).toBeDefined();

        (global as any).window = originalWindow;
        (global as any).self = originalSelf;
    });

    it("should not create a global Q object when the condition is false", () => {
        const originalWindow = (global as any).window;
        const originalSelf = (global as any).self;

        (global as any).window = undefined;
        (global as any).self = { Q: undefined };

        const q = Q;

        expect((global as any).Q).toBeUndefined();

        (global as any).window = originalWindow;
        (global as any).self = originalSelf;
    });
});