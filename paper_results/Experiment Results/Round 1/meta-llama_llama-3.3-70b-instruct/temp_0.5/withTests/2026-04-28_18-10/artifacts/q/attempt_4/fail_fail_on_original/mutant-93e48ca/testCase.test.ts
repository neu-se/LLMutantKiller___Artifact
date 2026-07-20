import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function with post method", () => {
    it("should not throw an error when name is null or undefined in the original code", () => {
        const obj = {
            post: jest.fn(),
        };

        expect(() => Q(obj).post(null, [1, 2, 3])).not.toThrowError();
    });
});