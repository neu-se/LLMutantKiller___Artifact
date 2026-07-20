import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delay function", () => {
    it("should delay the resolution of a promise by the specified timeout", (done) => {
        const startTime = new Date().getTime();
        Q.delay(Promise.resolve("test"), 100).then((value) => {
            const endTime = new Date().getTime();
            expect(value).toBe("test");
            expect(endTime - startTime).toBeGreaterThanOrEqual(100);
            done();
        });
    });
});