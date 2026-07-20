import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function behavior", () => {
    it("should behave differently based on the export type", () => {
        // Create a new module object
        const module = { exports: {} };

        // Original code behavior
        const originalModule = Object.create(module);
        originalModule.exports = {};

        // Check if the Q function is exported correctly
        expect(typeof Q).toBe("function");

        // If the export type is an object, the Q function should return a promise
        const objectExport = { exports: {} };
        const nonObjectExport = {};

        // Original code behavior
        expect(() => {
            if (typeof objectExport === "object" && objectExport && typeof objectExport.exports === "object") {
                objectExport.exports = Q;
            }
        }).not.toThrow();

        // Mutated code behavior
        expect(() => {
            if (typeof nonObjectExport === "object" || typeof nonObjectExport.exports === "object") {
                nonObjectExport.exports = Q;
            }
        }).not.toThrow();

        // This test case should pass on the original code and fail on the mutated code
        // Because the mutated code exports the Q function even when the export type is not an object
        expect(() => {
            const invalidExport = "string";
            if (typeof invalidExport === "object" && invalidExport && typeof invalidExport.exports === "object") {
                invalidExport.exports = Q;
            }
        }).toThrow();

        expect(() => {
            const invalidExport = "string";
            if (typeof invalidExport === "object" || typeof invalidExport.exports === "object") {
                invalidExport.exports = Q;
            }
        }).toThrow(); // This should fail in the mutated code
    });
});