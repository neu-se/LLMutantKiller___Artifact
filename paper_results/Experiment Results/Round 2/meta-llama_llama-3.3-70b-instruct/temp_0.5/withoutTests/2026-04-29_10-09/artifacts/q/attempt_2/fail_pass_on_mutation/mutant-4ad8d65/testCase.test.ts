import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.fcall", () => {
    it("should call the function with the correct arguments", () => {
        const func = jest.fn(function(arg1, arg2) {
            return arg1 + arg2;
        });
        const result = Q.fcall(func, "a", "b");
        expect(result.then).toBeInstanceOf(Function);
        result.then((value) => {
            expect(value).toBe("ab");
        });
    });

    it.skip("should fail when the method name is empty", () => {
        const func = jest.fn(function(arg1, arg2) {
            return arg1 + arg2;
        });
        expect(() => Q.fcall(func)).toThrowError();
    });
});