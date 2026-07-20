import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly find an index of an element in an array", () => {
        const array = [1, 2, 3, 4, 5];
        const index = array.indexOf(3);
        expect(index).toBe(2);
    });
});