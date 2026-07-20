describe("Q.tap", () => {
    it("should call the callback with the value of the promise", () => {
        const Q = require('../../../../../../../../../subject_repositories/q/q.js');
        const called = false;
        const promise = Q("foo");
        return promise.tap((value: string) => {
            called = true;
            expect(value).toBe("foo");
        }).then(() => {
            expect(called).toBe(true);
        });
    });
});