import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle array indexing correctly", () => {
        const array = [1, 2, 3];
        const promise = Q(array);
        return promise.then((array: any[]) => {
            expect(array.indexOf(1)).toBe(0);
            expect(array.indexOf(2)).toBe(1);
            expect(array.indexOf(3)).toBe(2);
            expect(array.indexOf(4)).toBe(-1);
        });
    });
});