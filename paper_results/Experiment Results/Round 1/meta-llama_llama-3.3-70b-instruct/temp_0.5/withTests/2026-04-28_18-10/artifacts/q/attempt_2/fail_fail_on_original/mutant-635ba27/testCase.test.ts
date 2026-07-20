import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("indexOf function", () => {
    it("should return the correct index when the value is found", () => {
        const array = [1, 2, 3, 4, 5];
        const index = Q.indexOf(array, 3);
        expect(index).toBe(2);
    });

    it("should return -1 when the value is not found", () => {
        const array = [1, 2, 3, 4, 5];
        const index = Q.indexOf(array, 6);
        expect(index).toBe(-1);
    });
});