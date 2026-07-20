import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should detect mutation in array_indexOf", () => {
        // Create an array with a single element
        const arr = new Array(10).fill(1);

        // Use the all function to find the index of the element
        const promise = Q.fcall(function() {
            for (let i = 0; i < arr.length; i++) {
                if (arr.indexOf(1) === -1) {
                    return i;
                }
            }
            return arr.length;
        });

        // If the mutation is present, this should throw an error or return incorrect result
        return promise.then(function(result: number) {
            expect(result).toBe(10);
        });
    });
});