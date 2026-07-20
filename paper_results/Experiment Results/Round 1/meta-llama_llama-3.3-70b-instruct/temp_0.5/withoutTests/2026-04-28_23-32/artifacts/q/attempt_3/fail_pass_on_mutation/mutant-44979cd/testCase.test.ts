import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should be able to create a promise using Q", () => {
        const promise = q.default(10);
        expect(promise.inspect().state).toBe("fulfilled");
        expect(promise.inspect().value).toBe(10);
    });
});