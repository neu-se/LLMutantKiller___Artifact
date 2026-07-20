import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("post function", () => {
    it("should pass when name is null in original code and fail when name is not null in mutated code", () => {
        const obj = {
            add: jest.fn(),
        };
        const promise = Q(obj);
        return promise.post(null, [1, 2]).then((result) => {
            expect(obj.add).toHaveBeenCalledTimes(1);
            expect(obj.add).toHaveBeenCalledWith(1, 2);
            expect(result).toBeUndefined();
        });
    });
});