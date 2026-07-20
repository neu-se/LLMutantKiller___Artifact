import { Q } from "../../../q.js";

describe("Q", () => {
    it("should pass when exports is an object and module is an object", () => {
        const originalExports = typeof exports;
        const originalModule = typeof module;

        exports = { foo: "bar" };
        module = { exports: {} };

        expect(() => {
            // @ts-ignore
            new Function('Q', 'module', 'exports', 'return Q')();
        }).not.toThrow();

        exports = originalExports;
        module = originalModule;
    });
});