import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter internal frames from stack traces", () => {
        const error = new Error();
        const promise = Q.reject(error);
        const isInternalFrame = Q.isInternalFrame;
        const spy = jest.spyOn(Q, 'isInternalFrame');
        promise.then(null, (err) => {
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
});