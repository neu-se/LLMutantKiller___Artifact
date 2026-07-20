import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.fcall", () => {
    it("should throw an error when the method name is not 'apply'", () => {
        const func = jest.fn();
        const originalFcall = Q.fcall;
        Q.fcall = function(object, ...args) {
            Q.dispatch(object, "", args);
        };
        expect(() => Q.fcall(func)).toThrowError();
        Q.fcall = originalFcall;
    });
});