import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.fcall", () => {
    it("should call the function with the correct arguments and return a promise", () => {
        const func = jest.fn((arg1, arg2) => arg1 + arg2);
        const result = Q.fcall(func, "a", "b");
        expect(result.then).toBeInstanceOf(Function);
        result.then((value) => {
            expect(value).toBe("ab");
        });
        expect(func).toHaveBeenCalledTimes(1);
    });
});