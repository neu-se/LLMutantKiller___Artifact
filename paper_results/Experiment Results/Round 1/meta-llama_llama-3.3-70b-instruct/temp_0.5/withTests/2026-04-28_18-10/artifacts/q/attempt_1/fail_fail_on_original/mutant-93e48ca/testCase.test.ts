import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function with post method", () => {
    it("should call the post method with the correct arguments", () => {
        const obj = {
            post: jest.fn(),
        };

        Q(obj).post("testMethod", [1, 2, 3]);

        expect(obj.post).toHaveBeenCalledTimes(1);
        expect(obj.post).toHaveBeenCalledWith("testMethod", 1, 2, 3);
    });

    it("should call the post method without a method name", () => {
        const func = jest.fn();
        Q(func).post(undefined, [1, 2, 3]);

        expect(func).toHaveBeenCalledTimes(1);
        expect(func).toHaveBeenCalledWith(1, 2, 3);
    });
});