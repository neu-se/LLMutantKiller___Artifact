import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("indexOf function", () => {
    it("should return the correct index when the value is found in the array", () => {
        var arr = [1, 2, 3, 4, 5];
        var value = 3;
        var index = Q.indexOf(arr, value);
        expect(index).toBe(2);
    });

    it("should return -1 when the value is not found in the array", () => {
        var arr = [1, 2, 3, 4, 5];
        var value = 6;
        var index = Q.indexOf(arr, value);
        expect(index).toBe(-1);
    });
});