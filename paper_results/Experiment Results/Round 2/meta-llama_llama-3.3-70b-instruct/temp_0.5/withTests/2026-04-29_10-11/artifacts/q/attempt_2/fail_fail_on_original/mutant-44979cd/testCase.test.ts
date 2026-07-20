import { Q } from "../../../q.js";

describe("Q", () => {
    it("should pass when exports is an object and module is an object", () => {
        const originalExports = typeof exports;
        const originalModule = typeof module;

        exports = { foo: "bar" };
        module = { id: "q" };

        expect(typeof Q).toBe("function");

        exports = originalExports;
        module = originalModule;
    });

    it("should fail when exports is not an object", () => {
        const originalExports = typeof exports;

        exports = true;

        expect(() => {
            // @ts-ignore
            new Function('Q', 'module', 'exports', 'return Q')();
        }).toThrow();

        exports = originalExports;
    });
});