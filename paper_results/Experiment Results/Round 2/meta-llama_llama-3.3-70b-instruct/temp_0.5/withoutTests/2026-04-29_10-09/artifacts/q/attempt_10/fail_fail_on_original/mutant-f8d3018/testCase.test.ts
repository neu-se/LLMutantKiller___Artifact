describe("Q Promise", () => {
    it("should call progressed function when provided", (done) => {
        const Q = require('./q.js');
        const progressed = jest.fn();
        const promise = Q.resolve(1);
        promise.then(void 0, void 0, (value) => {
            progressed(value);
            expect(progressed).toHaveBeenCalledTimes(1);
            done();
        });
    });
});