import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should enable long stack traces when Q_DEBUG is set", () => {
        process.env.Q_DEBUG = "true";
        const originalQ = Q;
        const q = originalQ();
        expect(q.longStackSupport).toBe(true);
        delete process.env.Q_DEBUG;
    });
});