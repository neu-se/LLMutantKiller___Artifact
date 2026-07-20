import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should be able to create a promise using Q", () => {
        const condition = typeof exports === "object" && typeof module === "object";
        expect(condition).toBe(true);
        const isMutated = typeof exports !== "object" || typeof module !== "object";
        expect(isMutated).toBe(false);
        const promise = q(10);
        expect(promise.inspect().state).toBe("fulfilled");
        expect(promise.inspect().value).toBe(10);
    });
});