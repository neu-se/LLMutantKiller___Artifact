import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("array_indexOf function", () => {
    it("should return the correct index when the value is found in the array", () => {
        var arr = [1, 2, 3, 4, 5];
        var value = 3;
        var index = arr.indexOf(value);
        expect(index).toBe(2);
    });

    it("should return -1 when the value is not found in the array", () => {
        var arr = [1, 2, 3, 4, 5];
        var value = 6;
        var index = arr.indexOf(value);
        expect(index).toBe(-1);
    });

    it("should return the correct index when the value is found at the beginning of the array", () => {
        var arr = [1, 2, 3, 4, 5];
        var value = 1;
        var index = arr.indexOf(value);
        expect(index).toBe(0);
    });

    it("should return the correct index when the value is found at the end of the array", () => {
        var arr = [1, 2, 3, 4, 5];
        var value = 5;
        var index = arr.indexOf(value);
        expect(index).toBe(4);
    });
});