import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should create a global Q object when not in a secure EcmaScript environment and ses is not available", () => {
        var originalSes = globalThis.ses;
        globalThis.ses = undefined;

        var originalWindow = globalThis.window;
        globalThis.window = { };

        var originalSelf = globalThis.self;
        globalThis.self = { };

        try {
            var q = Q;
        } catch (e) {
            expect(e.message).toBe("This environment was not anticipated by Q. Please file a bug.");
        }

        globalThis.ses = originalSes;
        globalThis.window = originalWindow;
        globalThis.self = originalSelf;
    });
});