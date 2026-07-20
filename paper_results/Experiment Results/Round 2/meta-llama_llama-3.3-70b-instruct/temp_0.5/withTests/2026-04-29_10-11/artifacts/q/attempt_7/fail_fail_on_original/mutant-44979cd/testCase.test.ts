import { Q } from "../../../q.js";

describe("Q", () => {
    it("should pass when exports is an object and module is an object", () => {
        const originalExports = typeof exports;
        const originalModule = typeof module;

        exports = { foo: "bar" };
        module = { exports: {} };

        expect(typeof Q).toBe("function");

        exports = originalExports;
        module = originalModule;
    });

    it("should fail when exports is not an object and module is an object", () => {
        const originalExports = typeof exports;
        const originalModule = typeof module;

        exports = true;
        module = { exports: {} };

        expect(() => {
            const QInstance = Q;
        }).toThrow();

        exports = originalExports;
        module = originalModule;
    });
});