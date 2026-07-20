import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.fcall", () => {
    it("should not throw an error when calling fcall with a function", () => {
        const func = jest.fn();
        expect(() => Q.fcall(func)).not.toThrowError();
    });
});