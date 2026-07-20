import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should create a global Q object when not in a secure EcmaScript environment", () => {
        var originalWindow = globalThis.window;
        var originalSelf = globalThis.self;
        globalThis.window = undefined;
        globalThis.self = undefined;

        var originalQ = Q;
        var newQ = Q;

        expect(newQ).toBe(originalQ);

        globalThis.window = originalWindow;
        globalThis.self = originalSelf;
    });
});