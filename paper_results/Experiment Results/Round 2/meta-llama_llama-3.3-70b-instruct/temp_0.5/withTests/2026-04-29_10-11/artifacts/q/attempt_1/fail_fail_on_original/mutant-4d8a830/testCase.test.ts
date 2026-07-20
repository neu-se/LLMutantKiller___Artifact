import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q post method", () => {
    it("should call the post method with the provided name and arguments", () => {
        const obj = {
            method: (a, b, c) => a + b + c,
        };

        return Q.post(obj, "method", [1, 2, 3]).then((result) => {
            expect(result).toBe(6);
        });
    });

    it("should call the function with no name provided", () => {
        const func = (a, b, c) => a + b + c;

        return Q.post(func, undefined, [1, 2, 3]).then((result) => {
            expect(result).toBe(6);
        });
    });

    it("should reject if the method does not exist", () => {
        const obj = {};

        return Q.post(obj, "method", [1, 2, 3]).then(() => {
            expect(true).toBe(false);
        }, (error) => {
            expect(error.message).toBe("Q can't post to non-function 'method'");
        });
    });
});