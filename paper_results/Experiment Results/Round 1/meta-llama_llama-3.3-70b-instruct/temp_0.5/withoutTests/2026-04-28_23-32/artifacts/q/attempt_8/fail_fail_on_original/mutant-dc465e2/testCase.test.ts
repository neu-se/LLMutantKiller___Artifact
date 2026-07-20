import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise timeout", () => {
    it("should resolve with the original value after clearing the timeout", (done) => {
        const promise = Q(10).timeout(100);
        const timeoutId = setTimeout(() => {
            clearTimeout(timeoutId);
            promise.then((value) => {
                expect(value).toBe(10);
                done();
            });
        }, 150);
    });
});