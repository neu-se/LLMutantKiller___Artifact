import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly find an index of an element in an array", () => {
        var array = [1, 2, 3, 4, 5];
        var foundIndex = -1;
        for (var i = array.length - 1; i >= 0; i--) {
            if (array[i] === 3) {
                foundIndex = i;
                break;
            }
        }
        expect(foundIndex).toBe(2);
        var mutatedArray = [1, 2, 3, 4, 5];
        var mutatedFoundIndex = -1;
        for (var j = mutatedArray.length - 1; j >= 0; j--) {
            if (mutatedArray[j] === 3) {
                mutatedFoundIndex = j;
                break;
            }
        }
        expect(mutatedFoundIndex).toBe(2);
    });
});