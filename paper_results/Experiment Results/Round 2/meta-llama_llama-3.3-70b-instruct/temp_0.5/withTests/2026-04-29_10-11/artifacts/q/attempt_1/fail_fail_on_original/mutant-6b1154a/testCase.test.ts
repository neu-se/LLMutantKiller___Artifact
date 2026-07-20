import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should resolve a promise correctly", () => {
        const promise = Q(5);
        return promise.then((value) => {
            expect(value).toBe(5);
        });
    });
});