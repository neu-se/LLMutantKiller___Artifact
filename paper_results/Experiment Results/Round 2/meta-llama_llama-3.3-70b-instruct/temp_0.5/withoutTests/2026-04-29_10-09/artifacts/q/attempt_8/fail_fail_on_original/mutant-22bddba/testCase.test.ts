import { Q } from "./q.js";

describe("Q", () => {
    it("should create a global Q object when window is defined and self is defined", () => {
        const originalWindow = (global as any).window;
        const originalSelf = (global as any).self;

        (global as any).window = {};
        (global as any).self = {};

        Q;

        expect((global as any).Q).toBeDefined();

        (global as any).window = originalWindow;
        (global as any).self = originalSelf;
    });

    it("should create a global Q object when window is defined and self is undefined", () => {
        const originalWindow = (global as any).window;
        const originalSelf = (global as any).self;

        (global as any).window = {};
        (global as any).self = undefined;

        Q;

        expect((global as any).Q).toBeDefined();

        (global as any).window = originalWindow;
        (global as any).self = originalSelf;
    });

    it("should create a global Q object when window is undefined and self is defined", () => {
        const originalWindow = (global as any).window;
        const originalSelf = (global as any).self;

        (global as any).window = undefined;
        (global as any).self = {};

        Q;

        expect((global as any).Q).toBeDefined();

        (global as any).window = originalWindow;
        (global as any).self = originalSelf;
    });
});