import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should resolve promises correctly", () => {
        const promise = Q([1, 2, 3]);
        const result = promise.then((value) => value.reduce((a, b) => a + b, 0));
        return result.then((sum) => {
            expect(sum).toBe(6);
        });
    });
});