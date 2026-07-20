import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should test the behavior of the mutated file", () => {
        const array = [1, 2, 3];
        const result = Q(array).then((array) => {
            return array.map((value) => value * 2);
        });
        return result.then((result) => {
            expect(result).toEqual([2, 4, 6]);
        });
    });
});