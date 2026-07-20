import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("indexOf function", () => {
    it("should return the correct index when the value is found", () => {
        const array = [1, 2, 3, 4, 5];
        const value = 3;
        const index = Q.indexOf(array, value);
        expect(index).toBe(2);
    });

    it("should return -1 when the value is not found", () => {
        const array = [1, 2, 3, 4, 5];
        const value = 6;
        const index = Q.indexOf(array, value);
        expect(index).toBe(-1);
    });

    it("should work with strings", () => {
        const array = ["a", "b", "c", "d", "e"];
        const value = "c";
        const index = Q.indexOf(array, value);
        expect(index).toBe(2);
    });

    it("should work with objects", () => {
        const array = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
        const value = { id: 3 };
        const index = Q.indexOf(array, value);
        expect(index).toBe(-1); // Note: This will return -1 because objects are compared by reference, not value.
    });
});