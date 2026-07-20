import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly find an element in an array", () => {
        const array = [1, 2, 3, 4, 5];
        const value = 3;
        const index = Q(array).indexOf(value);
        expect(index).toBe(2);
    });
});