import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should call the finally callback when the promise is fulfilled", () => {
        let called = false;
        Q(Promise.prototype.finally = function(callback) {
            callback();
        });
        return Q("foo")
            .finally(() => {
                called = true;
            })
            .then(() => {
                expect(called).toBe(true);
            });
    });
});