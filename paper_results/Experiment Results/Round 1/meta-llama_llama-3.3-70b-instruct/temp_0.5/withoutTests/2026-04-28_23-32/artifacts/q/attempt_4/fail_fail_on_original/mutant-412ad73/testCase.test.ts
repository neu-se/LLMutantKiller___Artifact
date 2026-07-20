import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module", () => {
    it("should define Q as a global when executed as a script", () => {
        const originalWindowQ = (globalThis as any).Q;
        (globalThis as any).Q = undefined;
        q();
        expect((globalThis as any).Q).toBeDefined();
        (globalThis as any).Q = originalWindowQ;
    });
});