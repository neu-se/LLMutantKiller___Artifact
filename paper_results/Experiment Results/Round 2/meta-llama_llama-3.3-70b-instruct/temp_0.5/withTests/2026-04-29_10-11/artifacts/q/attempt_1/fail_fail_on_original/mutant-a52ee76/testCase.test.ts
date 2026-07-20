import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should enable long stack support when Q_DEBUG is set", () => {
        process.env.Q_DEBUG = 'true';
        const originalQ = Q.longStackSupport;
        Q.longStackSupport = false; // reset longStackSupport
        expect(Q.longStackSupport).toBe(false);
        delete process.env.Q_DEBUG;
        expect(Q.longStackSupport).toBe(false);
    });
});