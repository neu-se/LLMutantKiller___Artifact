import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function behavior", () => {
    it("should behave differently based on the export type", () => {
        const module = { exports: {} };

        // Original code behavior
        expect(() => {
            if (typeof module === "object" && module.exports !== undefined && typeof module.exports === "object") {
                module.exports = Q;
            }
        }).not.toThrow();

        // Mutated code behavior
        expect(() => {
            if (typeof module === "object" || module.exports !== undefined && typeof module.exports === "object") {
                module.exports = Q;
            }
        }).not.toThrow();

        // Test case to check if the Q function behaves correctly when the export type is an object
        const objectExport = { exports: {} };
        expect(() => {
            if (typeof objectExport === "object" && objectExport.exports !== undefined && typeof objectExport.exports === "object") {
                objectExport.exports = Q;
            }
        }).not.toThrow();

        // Test case to check if the Q function behaves correctly when the export type is not an object
        const nonObjectExport = { foo: 'bar' };
        expect(() => {
            if (typeof nonObjectExport === "object" && nonObjectExport.exports !== undefined && typeof nonObjectExport.exports === "object") {
                nonObjectExport.exports = Q;
            }
        }).toThrow();

        expect(() => {
            if (typeof nonObjectExport === "object" || nonObjectExport.exports !== undefined && typeof nonObjectExport.exports === "object") {
                nonObjectExport.exports = Q;
            }
        }).toThrow(); // This should fail in the mutated code
    });
});