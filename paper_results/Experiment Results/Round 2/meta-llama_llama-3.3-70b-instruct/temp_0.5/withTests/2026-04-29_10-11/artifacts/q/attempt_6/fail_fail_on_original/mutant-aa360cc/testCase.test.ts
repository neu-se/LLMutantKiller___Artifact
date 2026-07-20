import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should warn when a deprecated function is used", () => {
        const originalWarn = console.warn;
        let warned = false;
        console.warn = () => {
            warned = true;
        };

        Q(function (resolve, reject, notify) {
            resolve();
        }, function (value) {
            return Q.deprecate(function () { }, "test", "testAlternative");
        });

        expect(warned).toBe(true);

        console.warn = originalWarn;
    });
});