import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should export q as a function", () => {
        expect(typeof q).toBe("function");
    });
});