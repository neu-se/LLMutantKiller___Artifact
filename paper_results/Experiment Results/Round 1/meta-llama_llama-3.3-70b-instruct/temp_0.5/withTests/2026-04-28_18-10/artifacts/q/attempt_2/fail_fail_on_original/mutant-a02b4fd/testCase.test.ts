import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("post function", () => {
    it("should call a function with no name", () => {
        const func = jest.fn();
        const promise = Q(func);
        return promise.post(null, [1, 2, 3]).then((result) => {
            expect(func).toHaveBeenCalledTimes(1);
            expect(func).toHaveBeenCalledWith(1, 2, 3);
            expect(result).toBeUndefined();
        });
    });

    it("should call a function with a name", () => {
        const obj = {
            add: jest.fn(),
        };
        const promise = Q(obj);
        return promise.post("add", [1, 2]).then((result) => {
            expect(obj.add).toHaveBeenCalledTimes(1);
            expect(obj.add).toHaveBeenCalledWith(1, 2);
            expect(result).toBeUndefined();
        });
    });

    it("should reject if the function does not exist", () => {
        const obj = {};
        const promise = Q(obj);
        return promise.post("add", [1, 2]).then(() => {
            expect(true).toBe(false);
        }, (error) => {
            expect(error).toBeInstanceOf(Error);
        });
    });
});