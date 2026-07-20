describe("Q", () => {
    it("should call the finally callback when the promise is fulfilled", () => {
        let called = false;
        const Q = require("../../../../q.js");
        const promise = Q("foo");
        promise.finally(() => {
            called = true;
        });
        expect(promise.finally).toBeDefined();
        promise.then(() => {
            expect(called).toBe(true);
        });
    });
});