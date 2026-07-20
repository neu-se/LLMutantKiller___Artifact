import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module", () => {
    it("should define Q as a function and have a noConflict method", () => {
        const Q = q(1);
        expect(typeof Q).toBe("object");
        expect(typeof Q.noConflict).toBe("function");
        Q.noConflict();
    });
});