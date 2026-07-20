import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of the mutated file", () => {
        const array = [1, 2, 3];
        const result = Q(array).then((array: number[]) => {
            return array.map((value: number) => value * 2);
        });
        return result.then((result: number[]) => {
            expect(result).toEqual([2, 4, 6]);
        });
    });
});