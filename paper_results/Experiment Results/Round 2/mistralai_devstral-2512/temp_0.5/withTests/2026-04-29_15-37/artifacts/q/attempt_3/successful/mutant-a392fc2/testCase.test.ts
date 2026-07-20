import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.fin", () => {
    it("should accept a valid callback function", () => {
        let callbackInvoked = false;
        const promise = Q.resolve(42);
        return promise.fin(() => {
            callbackInvoked = true;
        }).then(() => {
            expect(callbackInvoked).toBe(true);
        });
    });
});