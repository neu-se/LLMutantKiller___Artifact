import { Promise } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise.prototype.finally', function () {
    it('should call the callback when the promise is fulfilled', function () {
        var called = false;
        return new Promise(function (resolve) {
            resolve();
        }).finally(function () {
            called = true;
        }).then(function () {
            expect(called).toBe(true);
        });
    });
});