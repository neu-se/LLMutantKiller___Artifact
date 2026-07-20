import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function with post method", () => {
    it("should call the function when name is null or undefined", () => {
        const func = jest.fn();
        Q(func).post(null, [1, 2, 3]);
        expect(func).toHaveBeenCalledTimes(1);
        expect(func).toHaveBeenCalledWith(1, 2, 3);
    });
});