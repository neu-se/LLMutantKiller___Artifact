import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.fapply", () => {
    it("should apply a function with the given arguments", () => {
        const func = (a: number, b: number, c: number) => a + b + c;
        const promise = Q(func);
        return promise.fapply([1, 2, 3]).then((result) => {
            expect(result).toBe(6);
        });
    });

    it("should reject if the function throws an error", () => {
        const func = () => { throw new Error("Test error"); };
        const promise = Q(func);
        return promise.fapply([]).then(() => {
            expect(true).toBe(false);
        }, (error) => {
            expect(error.message).toBe("Test error");
        });
    });
});