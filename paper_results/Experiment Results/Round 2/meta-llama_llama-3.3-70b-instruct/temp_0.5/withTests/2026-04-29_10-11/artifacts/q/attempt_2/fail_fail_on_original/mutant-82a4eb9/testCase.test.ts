import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should resolve a promise when using Q.resolve", () => {
        const promise = Q.resolve("test");
        expect(promise.isFulfilled()).toBe(true);
    });
});