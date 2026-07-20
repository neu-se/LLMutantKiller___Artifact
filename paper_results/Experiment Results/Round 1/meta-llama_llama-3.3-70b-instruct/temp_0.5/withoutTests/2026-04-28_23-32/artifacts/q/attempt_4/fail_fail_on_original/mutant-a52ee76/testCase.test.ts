import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support", () => {
    it("should enable long stack support when Q_DEBUG is set", () => {
        process.env.Q_DEBUG = 'true';
        const originalLongStackSupport = Q.longStackSupport;
        if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
            // do nothing
        }
        expect(Q.longStackSupport).not.toBe(originalLongStackSupport);
    });
});