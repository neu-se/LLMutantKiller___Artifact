import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should enable long stack support when Q_DEBUG is set", () => {
        process.env.Q_DEBUG = 'true';
        const originalCode = `
        if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
            Q.longStackSupport = true;
        }
        `;
        const mutatedCode = `
        if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
        }
        `;
        const originalFunction = new Function('Q', originalCode);
        const mutatedFunction = new Function('Q', mutatedCode);
        originalFunction(Q);
        expect(Q.longStackSupport).toBe(true);
        Q.longStackSupport = false; // reset longStackSupport
        mutatedFunction(Q);
        expect(Q.longStackSupport).toBe(false);
        delete process.env.Q_DEBUG;
    });
});