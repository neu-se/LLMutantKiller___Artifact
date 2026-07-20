import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function behavior", () => {
    it("should create a global Q object when executed as a script", () => {
        const globalQ = globalThis.Q;
        expect(globalQ).toBeDefined();
        expect(typeof globalQ).toBe('function');
    });
});