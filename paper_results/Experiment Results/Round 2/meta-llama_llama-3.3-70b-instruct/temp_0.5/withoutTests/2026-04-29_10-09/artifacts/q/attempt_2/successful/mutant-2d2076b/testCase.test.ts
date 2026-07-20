import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delay function", () => {
    it("should delay the resolution of a promise by the specified timeout", (done) => {
        const startTime = new Date().getTime();
        Q.delay(void 0, 100).then((value) => {
            const endTime = new Date().getTime();
            expect(endTime - startTime).toBeGreaterThanOrEqual(100);
            done();
        });
    });
});