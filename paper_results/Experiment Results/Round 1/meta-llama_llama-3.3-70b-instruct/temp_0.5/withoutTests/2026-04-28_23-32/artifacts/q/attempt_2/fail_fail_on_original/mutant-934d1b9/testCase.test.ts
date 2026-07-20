import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should resolve a promise when the input is already resolved", () => {
        const promise = Q.resolve("test");
        return promise.then((value) => {
            expect(value).toBe("test");
        });
    });
});