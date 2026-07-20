import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("post function", () => {
    it("should pass when name is null in original code and fail when name is not null in mutated code", () => {
        const obj = (a: number, b: number) => {
            return a + b;
        };
        const promise = Q(obj);
        return promise.post(null, [1, 2]).then((result: number) => {
            expect(result).toBe(3);
        });
    });
});