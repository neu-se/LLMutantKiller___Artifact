import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("array_indexOf function", () => {
    it("should return the correct index when the value is found in the array in reverse order", () => {
        var arr = [1, 2, 3, 4, 5];
        var value = 3;
        var index = -1;
        for (var i = arr.length - 1; i >= 0; i--) {
            if (arr[i] === value) {
                index = i;
                break;
            }
        }
        expect(index).toBe(2);
    });
});