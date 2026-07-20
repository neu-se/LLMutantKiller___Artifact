import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly find an index of an element in an array using Q's implementation", () => {
        const array = [1, 2, 3, 4, 5];
        const index = Q(array).indexOf(3);
        expect(index).toBe(2);
    });
});