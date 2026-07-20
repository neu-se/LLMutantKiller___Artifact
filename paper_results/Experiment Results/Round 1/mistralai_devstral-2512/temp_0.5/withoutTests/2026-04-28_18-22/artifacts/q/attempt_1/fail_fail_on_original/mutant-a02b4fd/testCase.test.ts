import { Q } from "./q.js";

describe("Q promise post method", () => {
    it("should handle null method name correctly", () => {
        const obj = {
            method: function() {
                return "called";
            }
        };

        const promise = Q(obj);
        return promise.post(null, []).then(
            (result) => {
                // If the mutation is present, this will incorrectly call obj.apply
                // instead of obj[null].apply, which should throw an error
                expect(result).toBe("called");
            },
            (error) => {
                // In the original code, this path should not be taken
                // In the mutated code, this might be taken if obj[null] doesn't exist
                throw new Error("Should not reject when calling with null method name");
            }
        );
    });
});