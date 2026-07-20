describe("Q long stack support", () => {
    it("should be disabled by default and enabled when Q_DEBUG environment variable is set", () => {
        const Q = require('../../../../../../subject_repositories/q/q.js');
        expect(Q.longStackSupport).toBe(false);
        process.env.Q_DEBUG = 'true';
        const newQ = require('../../../../../../subject_repositories/q/q.js');
        expect(newQ.longStackSupport).toBe(true);
        delete process.env.Q_DEBUG;
    });
});