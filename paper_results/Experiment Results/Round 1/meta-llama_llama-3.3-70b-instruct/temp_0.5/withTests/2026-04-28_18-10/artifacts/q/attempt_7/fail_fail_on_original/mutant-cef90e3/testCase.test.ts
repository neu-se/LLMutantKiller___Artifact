import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.then", () => {
    it("should call the fulfilled callback and then the rejected callback when the promise is rejected after being fulfilled", () => {
        let fulfilledCalled = false;
        let rejectedCalled = false;
        const promise = Q(10).then(() => {
            fulfilledCalled = true;
            throw new Error();
        }).catch(() => {
            rejectedCalled = true;
        });
        return promise.then(() => {
            expect(fulfilledCalled).toBe(true);
            expect(rejectedCalled).toBe(true);
        });
    });
});