describe("Q Promise", () => {
    it("should call progressed function when provided", () => {
        const Q = require('./q.js');
        const progressed = jest.fn();
        const promise = Q.resolve(1);
        promise.then(void 0, void 0, progressed);
        expect(progressed).toHaveBeenCalledTimes(1);
    });
});