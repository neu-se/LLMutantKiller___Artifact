describe("Q Promise", () => {
    it("should call progressed function when provided in original code but not in mutated code", () => {
        const Q = require('./q.js');
        const progressed = jest.fn();
        const promise = Q.resolve(1);
        promise.then(void 0, void 0, progressed);
        // In the original code, progressed should be called
        // In the mutated code, progressed should not be called because of the condition return false ? progressed(value) : value;
        expect(progressed).toHaveBeenCalledTimes(1);
    });
});