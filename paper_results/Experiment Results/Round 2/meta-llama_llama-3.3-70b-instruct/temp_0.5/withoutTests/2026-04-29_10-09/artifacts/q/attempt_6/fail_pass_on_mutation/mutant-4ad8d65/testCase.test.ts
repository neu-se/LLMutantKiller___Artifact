import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.fcall", () => {
    it("should not throw an error when the method name is 'apply'", () => {
        const func = jest.fn();
        const originalDispatch = Q.dispatch;
        Q.dispatch = jest.fn(originalDispatch);
        expect(() => Q.fcall(func, "a", "b")).not.toThrowError();
        Q.dispatch = originalDispatch;
    });
});