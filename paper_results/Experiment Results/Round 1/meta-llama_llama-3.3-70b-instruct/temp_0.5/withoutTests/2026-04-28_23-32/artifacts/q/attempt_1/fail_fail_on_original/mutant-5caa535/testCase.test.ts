import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle array indexing correctly", () => {
        const array = [1, 2, 3];
        const promise = Q(array);
        return promise.then((array) => {
            expect(array[0]).toBe(1);
            expect(array[1]).toBe(2);
            expect(array[2]).toBe(3);
            expect(array[3]).toBeUndefined();
        });
    });
});