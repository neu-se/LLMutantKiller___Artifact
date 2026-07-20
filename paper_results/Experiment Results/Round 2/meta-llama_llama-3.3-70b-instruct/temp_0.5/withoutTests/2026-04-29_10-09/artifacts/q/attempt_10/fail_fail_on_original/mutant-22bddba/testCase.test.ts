import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should create a global Q object when window is defined", () => {
        const originalWindow = (global as any).window;
        const originalSelf = (global as any).self;

        (global as any).window = {};
        (global as any).self = undefined;

        Q;

        expect((global as any).Q).toBeDefined();

        (global as any).window = originalWindow;
        (global as any).self = originalSelf;
    });

    it("should not create a global Q object when window is undefined in the mutated code", () => {
        const originalWindow = (global as any).window;
        const originalSelf = (global as any).self;

        (global as any).window = undefined;
        (global as any).self = {};

        Q;

        expect((global as any).Q).toBeUndefined();

        (global as any).window = originalWindow;
        (global as any).self = originalSelf;
    });
});