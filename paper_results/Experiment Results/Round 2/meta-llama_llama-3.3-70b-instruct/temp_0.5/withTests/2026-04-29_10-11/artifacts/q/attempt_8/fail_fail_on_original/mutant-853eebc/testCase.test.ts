import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of the mutated file", () => {
        const array = [1, 2, 3];
        const result = Q(array).then((array) => {
            return array.reduce((acc, current) => {
                return acc + current;
            }, 0);
        });
        return result.then((result) => {
            expect(result).toEqual(6);
        });
    });
});