import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should warn when a deprecated function is used", () => {
        const originalWarn = console.warn;
        let warned = false;
        console.warn = () => {
            warned = true;
        };

        const deprecatedFunction = Q.deprecate(function () { }, "test", "testAlternative");
        deprecatedFunction();

        expect(warned).toBe(true);

        console.warn = originalWarn;
    });
});