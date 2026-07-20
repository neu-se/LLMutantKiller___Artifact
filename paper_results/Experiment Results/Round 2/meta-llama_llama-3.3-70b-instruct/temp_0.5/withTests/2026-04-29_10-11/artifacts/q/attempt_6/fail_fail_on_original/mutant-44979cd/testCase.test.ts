import { Q } from "../../../q.js";

describe("Q", () => {
    it("should pass when exports is an object and module is an object", () => {
        const originalExports = typeof exports;
        const originalModule = typeof module;

        exports = { foo: "bar" };
        module = { exports: {} };

        const QInstance = Q;
        expect(QInstance).toBeDefined();

        // Check if Q is a function when exports and module are objects
        expect(typeof QInstance).toBe("function");

        // Check if Q throws an error when exports is not an object
        expect(() => {
            exports = true;
            const QInstance = Q;
        }).toThrow();

        exports = originalExports;
        module = originalModule;
    });
});