import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should pass when exports is an object and module is an object", () => {
        const originalExports = typeof exports;
        const originalModule = typeof module;

        exports = { foo: "bar" };
        module = { exports: {} };

        const QInstance = Q;
        expect(QInstance).toBeDefined();

        exports = originalExports;
        module = originalModule;
    });
});