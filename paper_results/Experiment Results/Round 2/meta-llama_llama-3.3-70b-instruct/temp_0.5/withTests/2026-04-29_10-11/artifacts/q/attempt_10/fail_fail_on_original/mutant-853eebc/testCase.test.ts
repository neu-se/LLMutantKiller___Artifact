import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of the mutated file", () => {
        const array = [1, 2, 3];
        const result = Q(array).then((array: number[]) => {
            return array.reduce((acc: number, current: number) => {
                return acc + current;
            }, 0);
        });
        return result.then((result: number) => {
            expect(result).toEqual(6);
        });
    });
});