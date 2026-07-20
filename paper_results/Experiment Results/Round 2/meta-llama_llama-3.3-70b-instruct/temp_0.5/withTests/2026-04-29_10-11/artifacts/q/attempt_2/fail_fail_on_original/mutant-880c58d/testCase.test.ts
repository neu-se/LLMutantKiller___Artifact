import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support", () => {
    it("should be disabled by default and enabled when Q_DEBUG environment variable is set", () => {
        expect(Q.longStackSupport).toBe(false);
        process.env.Q_DEBUG = 'true';
        const newQ = require('../../../../../../../../subject_repositories/q/q.js').Q;
        expect(newQ.longStackSupport).toBe(true);
        delete process.env.Q_DEBUG;
    });
});