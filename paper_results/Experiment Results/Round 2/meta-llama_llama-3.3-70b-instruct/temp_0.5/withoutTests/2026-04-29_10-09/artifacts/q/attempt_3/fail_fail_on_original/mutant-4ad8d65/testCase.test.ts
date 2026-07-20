import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.fcall", () => {
    it("should call the function with the correct method name", () => {
        const func = jest.fn();
        const result = Q.fcall(func, "a", "b");
        expect(result.then).toBeInstanceOf(Function);
        result.then((value) => {
            expect(func).toHaveBeenCalledTimes(1);
        });
        // Check if the method name is "apply"
        const originalDispatch = Q.dispatch;
        Q.dispatch = jest.fn(originalDispatch);
        Q.fcall(func, "a", "b");
        expect(Q.dispatch).toHaveBeenCalledWith(expect.any(Function), "apply", expect.any(Array));
        Q.dispatch = originalDispatch;
    });
});