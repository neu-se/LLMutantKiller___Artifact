describe("Q", () => {
    it("should call the callback in tap method", () => {
        const Q = require('../../../../../../../../subject_repositories/q/q.js');
        const callback = jest.fn();
        const promise = Q.resolve();
        Q(promise).tap(callback);
        promise.then(() => {
            expect(callback).toHaveBeenCalledTimes(1);
        });
    });
});