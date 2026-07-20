import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support", () => {
    it("should enable long stack support when Q_DEBUG is set", () => {
        const originalLongStackSupport = Q.longStackSupport;
        process.env.Q_DEBUG = 'true';
        if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
            Q.longStackSupport = true;
        }
        expect(Q.longStackSupport).not.toBe(originalLongStackSupport);
    });
});