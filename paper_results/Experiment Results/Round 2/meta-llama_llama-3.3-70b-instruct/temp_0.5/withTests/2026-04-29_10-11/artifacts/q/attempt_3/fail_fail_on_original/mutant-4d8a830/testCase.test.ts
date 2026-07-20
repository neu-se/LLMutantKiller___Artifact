import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q post method", () => {
    it("should call the post method with the provided name and arguments when name is not null or undefined", () => {
        const obj = {
            method: (a: number, b: number, c: number) => a + b + c,
        };

        return Q.post(obj, "method", [1, 2, 3]).then((result: number) => {
            expect(result).toBe(6);
        });
    });

    it("should call the function with no name provided", () => {
        const func = (a: number, b: number, c: number) => a + b + c;

        return Q.post(func, undefined, [1, 2, 3]).then((result: number) => {
            expect(result).toBe(6);
        });
    });

    it("should reject if the method does not exist", () => {
        const obj = {};

        return Q.post(obj, "method", [1, 2, 3]).then(() => {
            expect(true).toBe(false);
        }, (error: any) => {
            expect(error.message).toBe("Q can't post to non-function 'method'");
        });
    });
});