import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should handle nextTick correctly", (done) => {
        const start = Date.now();
        q.nextTick(() => {
            const end = Date.now();
            expect(end - start).toBeGreaterThan(0);
            done();
        });
    });
});