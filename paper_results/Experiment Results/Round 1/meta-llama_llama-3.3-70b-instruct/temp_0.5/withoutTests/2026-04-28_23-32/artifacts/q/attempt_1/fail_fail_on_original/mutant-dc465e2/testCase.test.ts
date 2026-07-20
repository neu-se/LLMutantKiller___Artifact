import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise timeout", () => {
    it("should resolve with the original value after timeout when the promise is fulfilled", (done) => {
        const promise = Q.delay(Q(10), 100);
        const timeoutId = setTimeout(() => {
            promise.then((value) => {
                expect(value).toBe(10);
                done();
            });
        }, 150);
    });
});