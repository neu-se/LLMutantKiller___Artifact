import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should be able to create a promise using Q", () => {
        expect(typeof exports === "object" && typeof module === "object").toBe(true);
        const promise = q(10);
        expect(promise.inspect().state).toBe("fulfilled");
        expect(promise.inspect().value).toBe(10);
    });
});