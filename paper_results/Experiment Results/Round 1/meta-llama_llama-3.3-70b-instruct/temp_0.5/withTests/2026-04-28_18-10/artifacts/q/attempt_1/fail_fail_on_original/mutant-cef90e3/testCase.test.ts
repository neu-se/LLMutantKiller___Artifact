import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.then", () => {
    it("should call the fulfilled callback only once", () => {
        let called = false;
        const promise = Q(10);
        return promise.then(() => {
            called = true;
        }).then(() => {
            expect(called).toBe(true);
        });
    });
});