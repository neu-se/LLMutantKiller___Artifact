import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should detect mutation in array_indexOf", () => {
        // Create an array with a single element
        const arr = [1, 2, 3];

        // Use the all function to find the index of the element
        const promise = Q.all([Q.fcall(function() {
            return arr.indexOf(2);
        })]);

        // If the mutation is present, this should throw an error or return incorrect result
        return promise.then(function(index) {
            expect(index[0]).toBe(1);
        });
    });
});