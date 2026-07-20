import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.fcall", () => {
    it("should call the function and return the result", () => {
        const func = jest.fn(() => "result");
        const result = Q.fcall(func);
        expect(result.then).toBeInstanceOf(Function);
        expect(func).toHaveBeenCalledTimes(1);
        result.then((value) => {
            expect(value).toBe("result");
        });
    });

    it("should reject if the function throws an error", () => {
        const func = jest.fn(() => {
            throw new Error("error");
        });
        const result = Q.fcall(func);
        expect(result.then).toBeInstanceOf(Function);
        expect(func).toHaveBeenCalledTimes(1);
        result.catch((error) => {
            expect(error.message).toBe("error");
        });
    });
});