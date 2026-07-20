import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should detect mutation in array_indexOf", () => {
        // Create an array with a single element
        const arr = [1, 2, 3];

        // Use array_indexOf to find the index of the element
        const index = Q.array_indexOf(arr, 2);

        // If the mutation is present, this should throw an error or return incorrect result
        expect(index).toBe(1);
    });
});