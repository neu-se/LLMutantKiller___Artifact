import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q post method", () => {
    it("should call the post method with the provided name and arguments", () => {
        const obj = {
            method: (a: number, b: number, c: number) => a + b + c,
        };

        return Q(obj).post("method", [1, 2, 3]).then((result: number) => {
            expect(result).toBe(6);
        });
    });

    it("should call the function when name is null or undefined", () => {
        const func = (a: number, b: number, c: number) => a + b + c;

        return Q(func).post(null, [1, 2, 3]).then((result: number) => {
            expect(result).toBe(6);
        });
    });
});