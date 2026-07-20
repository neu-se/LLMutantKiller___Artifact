import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module", () => {
    it("should define Q and Q.noConflict when executed as a script", () => {
        (globalThis as any).Q = undefined;
        q(1);
        expect(typeof (globalThis as any).Q).toBe("function");
        expect(typeof (globalThis as any).Q.noConflict).toBe("function");
        (globalThis as any).Q.noConflict();
        expect((globalThis as any).Q).toBeUndefined();
    });
});