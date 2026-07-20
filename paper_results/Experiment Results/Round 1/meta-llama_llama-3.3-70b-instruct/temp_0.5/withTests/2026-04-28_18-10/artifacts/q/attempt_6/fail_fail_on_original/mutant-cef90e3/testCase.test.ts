import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.then", () => {
    it("should call the fulfilled callback only once", () => {
        let callCount = 0;
        const promise = Q(10);
        promise.then(() => {
            callCount++;
        });
        promise.then(() => {
            callCount++;
        });
        return promise.then(() => {
            expect(callCount).toBe(2);
        });
    });
});