import { Q } from "../../../q";

describe("Promise", () => {
    it("should call post with the correct arguments", () => {
        const obj = {
            method: (arg1: any, arg2: any) => {
                return arg1 + arg2;
            }
        };

        const promise = Q(obj).post("method", [1, 2]);
        return promise.then((result: any) => {
            expect(result).toBe(3);
        });
    });

    it("should not throw an error when post is called with an empty array in the original code", () => {
        const obj = {
            method: () => {
                return "result";
            }
        };

        const promise = Q(obj).post("method", []);
        return promise.then((result: any) => {
            expect(result).toBe("result");
        });
    });
});