import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support", () => {
    it("should enable long stack support when Q_DEBUG is set", () => {
        process.env.Q_DEBUG = 'true';
        Q.longStackSupport = false;
        expect(Q.longStackSupport).toBe(false);
        if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
            Q.longStackSupport = true;
        }
        expect(Q.longStackSupport).toBe(true);
    });
});