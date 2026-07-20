import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should have long stack support enabled when Q_DEBUG is set", () => {
        process.env.Q_DEBUG = 'true';
        const q = Q;
        expect(q.longStackSupport).toBeTruthy();
    });
});