import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.any function", () => {
    it("should return a promise that resolves to undefined when given an empty array", () => {
        const promise = Q.any([]);
        return promise.then((result) => {
            expect(result).toBeUndefined();
        });
    });
});