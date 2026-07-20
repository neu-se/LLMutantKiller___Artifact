import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module", () => {
    it("should define Q as a global when executed as a script and have a noConflict method", () => {
        (globalThis as any).Q = undefined;
        q();
        expect((globalThis as any).Q).toBeDefined();
        expect(typeof (globalThis as any).Q.noConflict).toBe("function");
        (globalThis as any).Q.noConflict();
        expect((globalThis as any).Q).toBeUndefined();
    });
});