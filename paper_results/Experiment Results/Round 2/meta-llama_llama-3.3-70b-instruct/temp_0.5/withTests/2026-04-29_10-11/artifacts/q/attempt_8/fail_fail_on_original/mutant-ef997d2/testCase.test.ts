describe("Q function", () => {
    it("should return a promise with inspect method", () => {
        var Q = require('../../../../q.js');
        var promise = Q(10);
        expect(promise.inspect()).toEqual({ state: "fulfilled", value: 10 });
    });
});