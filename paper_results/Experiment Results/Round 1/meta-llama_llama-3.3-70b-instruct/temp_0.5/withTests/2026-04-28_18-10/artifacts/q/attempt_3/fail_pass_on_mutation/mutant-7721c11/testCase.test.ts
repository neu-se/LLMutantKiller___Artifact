import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly find an index of an element in an array", () => {
        const array = [1, 2, 3, 4, 5];
        var found = false;
        for (var i = array.length - 1; i >= 0; i--) {
            if (array[i] === 3) {
                found = true;
            }
        }
        expect(found).toBe(true);
    });
});