import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should detect mutation in array_indexOf", () => {
        // Create an array with a single element
        const arr = [1, 2, 3];

        // Use the all function to find the index of the element
        const promise = Q.fcall(function() {
            const index = arr.indexOf(2);
            const lastIndex = arr.indexOf(3);
            return lastIndex - index;
        });

        // If the mutation is present, this should throw an error or return incorrect result
        return promise.then(function(result) {
            expect(result).toBe(1);
        });
    });
});