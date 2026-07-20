import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly find an index of an element in an array", () => {
        var array = [1, 2, 3, 4, 5];
        var index = q.array_indexOf(array, 3);
        expect(index).toBe(2);
        var index2 = q.array_indexOf(array, 6);
        expect(index2).toBe(-1);
    });
});