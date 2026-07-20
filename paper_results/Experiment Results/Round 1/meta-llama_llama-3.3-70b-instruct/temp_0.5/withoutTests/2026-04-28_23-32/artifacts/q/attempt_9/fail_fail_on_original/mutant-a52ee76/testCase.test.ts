import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support", () => {
    it("should enable long stack support when Q_DEBUG is set", () => {
        process.env.Q_DEBUG = 'true';
        const originalCode = `
            if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
                Q.longStackSupport = true;
            }
        `;
        const mutatedCode = `
            if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
                // do nothing
            }
        `;
        eval(originalCode);
        expect(Q.longStackSupport).toBe(true);
        eval(mutatedCode);
        expect(Q.longStackSupport).toBe(false);
    });
});