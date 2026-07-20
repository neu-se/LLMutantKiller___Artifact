import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf mutation test", () => {
    it("should correctly handle array operations when indexOf shim is used", () => {
        // Create an array-like object that will trigger the shim
        const arrayLike = {
            0: "a",
            1: "b",
            2: "c",
            length: 3
        };

        // Force the use of the shim by temporarily removing native indexOf
        const originalIndexOf = Array.prototype.indexOf;
        delete Array.prototype.indexOf;

        try {
            // Test through Q.keys() which uses object_keys internally
            // object_keys uses array_indexOf in its shim implementation
            return Q(arrayLike).keys().then((keys: string[]) => {
                // Filter out non-numeric keys (like "length")
                const numericKeys = keys.filter(key => !isNaN(parseInt(key)));
                // The mutation (i--) would cause an infinite loop in the shim
                // This test should complete quickly with original code
                // but hang or fail with mutated code
                expect(numericKeys).toEqual(["0", "1", "2"]);
            });
        } finally {
            // Restore original indexOf
            Array.prototype.indexOf = originalIndexOf;
        }
    });
});