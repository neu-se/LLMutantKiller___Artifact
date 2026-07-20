import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf mutation test", () => {
    it("should correctly find index in array using shim implementation", () => {
        // Create an array-like object that will trigger the shim
        const arrayLike = {
            0: "a",
            1: "b",
            2: "c",
            length: 3
        };

        // The mutation affects array_indexOf which is used by object_keys
        // We'll test this through Q.keys() which uses object_keys internally
        return Q(arrayLike).keys().then((keys: string[]) => {
            // Filter out non-numeric keys (like "length")
            const numericKeys = keys.filter(key => !isNaN(parseInt(key)));
            // The mutation (i--) would cause an infinite loop in the shim
            // This test should complete quickly with original code
            // but hang or fail with mutated code
            expect(numericKeys).toEqual(["0", "1", "2"]);
        });
    });
});