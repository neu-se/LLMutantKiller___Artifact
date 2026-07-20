import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.any function", () => {
    it("should return a promise when given an empty array", () => {
        const promise = Q.any([]);
        expect(promise).toBeTruthy();
        return promise.then((result) => {
            expect(result).toBeUndefined();
        });
    });
});