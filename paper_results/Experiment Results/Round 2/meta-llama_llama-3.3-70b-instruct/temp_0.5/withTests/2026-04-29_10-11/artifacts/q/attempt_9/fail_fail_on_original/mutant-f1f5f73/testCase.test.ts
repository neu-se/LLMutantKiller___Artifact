describe("Q.tap", () => {
    it("should call the callback with the value of the promise", () => {
        var Q = require('../../../../../../../../../subject_repositories/q/q.js').Q;
        var called = false;
        var promise = Q("foo");
        return promise.tap(function (value) {
            called = true;
            expect(value).toBe("foo");
        }).then(function () {
            expect(called).toBe(true);
        });
    });
});