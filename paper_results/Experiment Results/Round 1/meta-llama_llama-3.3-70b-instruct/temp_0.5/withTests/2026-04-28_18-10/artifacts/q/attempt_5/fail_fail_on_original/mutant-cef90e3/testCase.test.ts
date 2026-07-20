import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.then", () => {
    it("should not call the rejected callback when the promise is fulfilled", () => {
        let rejectedCalled = false;
        const promise = Q(10);
        return promise.then(() => {
        }, () => {
            rejectedCalled = true;
        }).then(() => {
            expect(rejectedCalled).toBe(false);
        });
    });
});