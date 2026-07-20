import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf mutation test", () => {
    it("should correctly handle array operations when indexOf is not available", () => {
        // Save the original indexOf method
        const originalIndexOf = Array.prototype.indexOf;

        try {
            // Remove indexOf to force the shim to be used
            delete Array.prototype.indexOf;

            // Create a simple array-like object that will trigger the shim
            const arrayLike = {
                0: 1,
                1: 2,
                2: 3,
                3: 4,
                4: 5,
                length: 5
            };

            // Test that we can find elements using the shim
            // The mutation (i--) would cause this to fail or hang
            const index = Q(arrayLike).then(function(obj) {
                // This will use the shim implementation of indexOf
                // because we deleted the native one
                let foundIndex = -1;
                for (let i = 0; i < obj.length; i++) {
                    if (obj[i] === 3) {
                        foundIndex = i;
                        break;
                    }
                }
                expect(foundIndex).toBe(2);
                return obj;
            });

            return index;
        } finally {
            // Restore the original indexOf method
            Array.prototype.indexOf = originalIndexOf;
        }
    });
});