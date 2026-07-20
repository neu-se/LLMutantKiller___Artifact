import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.then", () => {
    it("should not call the rejected callback when the promise is fulfilled and the done flag is set to true", () => {
        let called = false;
        const promise = Q(10);
        promise.then(() => {
            called = true;
        }, () => {
            expect(true).toBe(false);
        });
        promise.then(() => {
            expect(called).toBe(true);
        });
    });
});