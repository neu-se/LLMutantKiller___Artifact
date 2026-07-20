import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function with post method", () => {
    it("should not call the function when name is null or undefined in the mutated code", () => {
        const func = jest.fn();
        expect(() => Q(func).post(null, [1, 2, 3])).toThrowError();
    });
});