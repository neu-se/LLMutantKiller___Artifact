import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function with post method", () => {
    it("should call the post method with the correct arguments", () => {
        const obj = {
            testMethod: jest.fn(),
        };

        Q(obj).post("testMethod", [1, 2, 3]);

        expect(obj.testMethod).toHaveBeenCalledTimes(1);
        expect(obj.testMethod).toHaveBeenCalledWith(1, 2, 3);
    });

    it("should call the function with no method name", () => {
        const func = jest.fn();
        Q(func).post(undefined, [1, 2, 3]);

        expect(func).toHaveBeenCalledTimes(1);
        expect(func).toHaveBeenCalledWith(1, 2, 3);
    });

    it("should not call the post method if name is null or undefined in the original code", () => {
        const obj = {
            post: jest.fn(),
        };

        Q(obj).post(null, [1, 2, 3]);

        expect(obj.post).not.toHaveBeenCalled();
    });
});