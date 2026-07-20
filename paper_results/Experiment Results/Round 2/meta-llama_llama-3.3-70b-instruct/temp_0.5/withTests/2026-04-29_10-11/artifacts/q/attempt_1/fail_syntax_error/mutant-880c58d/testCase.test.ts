import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support", () => {
    it("should be disabled by default", () => {
        expect(Q.longStackSupport).toBe(false);
    });

    it("should be enabled when Q_DEBUG environment variable is set", () => {
        process.env.Q_DEBUG = 'true';
        const originalQ = Q;
        const newQ = require../../../../../../../../subject_repositories/q/q.js;
        expect(newQ.longStackSupport).toBe(true);
        process.env.Q_DEBUG = undefined;
    });
});