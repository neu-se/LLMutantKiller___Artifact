import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should detect mutation in array_indexOf", () => {
        // Create an array with a single element
        const arr = [1, 2, 3];

        // Define the array_indexOf function
        const array_indexOf = Q.uncurryThis(Array.prototype.indexOf);

        // Use the array_indexOf function to find the index of the element
        const index = array_indexOf(arr, 4);

        // If the mutation is present, this should return an incorrect result
        expect(index).toBe(-1);
    });
});