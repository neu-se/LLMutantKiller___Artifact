import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly find an index of an element in an array", () => {
        var array = [1, 2, 3, 4, 5];
        var foundIndex = -1;
        for (var i = 0; i < array.length; i++) {
            if (array[i] === 3) {
                foundIndex = i;
                break;
            }
        }
        expect(foundIndex).toBe(2);
        expect(i).toBe(5);
    });
});