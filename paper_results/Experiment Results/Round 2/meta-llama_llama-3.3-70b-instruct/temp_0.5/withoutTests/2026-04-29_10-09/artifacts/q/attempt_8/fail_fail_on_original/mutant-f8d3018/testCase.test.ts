describe("Q Promise", () => {
    it("should not call progressed function when provided in mutated code", () => {
        const Q = require('./q.js');
        const progressed = jest.fn();
        const promise = Q.resolve(1);
        promise.then(void 0, void 0, () => false);
        promise.then((value) => {
            expect(progressed).not.toHaveBeenCalled();
        });
    });
});