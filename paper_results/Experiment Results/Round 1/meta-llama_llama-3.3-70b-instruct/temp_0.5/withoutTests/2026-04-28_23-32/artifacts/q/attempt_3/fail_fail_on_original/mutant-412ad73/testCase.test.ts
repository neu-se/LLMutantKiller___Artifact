import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module", () => {
    it("should define Q as a global when executed as a script", () => {
        const originalWindowQ = globalThis.Q;
        delete globalThis.Q;
        q();
        expect(globalThis.Q).toBeDefined();
        globalThis.Q = originalWindowQ;
    });
});