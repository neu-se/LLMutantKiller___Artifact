import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of the mutated file", () => {
        const promise = Q(1);
        const onUnhandledError = jest.fn();
        promise.done();
        expect(onUnhandledError).toHaveBeenCalledTimes(0);
        
        // This line should be executed in the next tick
        Q.nextTick(() => {
            throw new Error("Test error");
        });
        
        // Add a small delay to allow the error to be thrown
        return Q.delay(10);
    });
});