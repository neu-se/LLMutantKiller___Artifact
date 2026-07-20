import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module", () => {
    it("should define Q as a function", () => {
        expect(typeof q).toBe("function");
        const result = q(1);
        expect(typeof result).toBe("object");
        expect(typeof result.then).toBe("function");
    });
});