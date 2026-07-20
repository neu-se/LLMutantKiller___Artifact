import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module", () => {
    it("should define Q and Q.noConflict", () => {
        const Q = q(1);
        expect(typeof q).toBe("function");
        expect(typeof (globalThis as any).Q).toBe("function");
        expect(typeof (globalThis as any).Q.noConflict).toBe("function");
    });
});