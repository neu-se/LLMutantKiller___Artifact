import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.then", () => {
    it("should call the rejected callback when the promise is rejected", () => {
        const promise = Q.reject("error");
        let called = false;
        return promise.then(null, () => {
            called = true;
        }).then(() => {
            expect(called).toBe(true);
        });
    });
});