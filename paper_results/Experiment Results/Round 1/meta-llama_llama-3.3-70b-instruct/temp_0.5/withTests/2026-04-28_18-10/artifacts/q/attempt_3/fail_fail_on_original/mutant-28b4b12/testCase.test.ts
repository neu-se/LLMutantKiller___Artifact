import { Q } from "./q";

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

    it("should throw an error when post is called with an empty array", () => {
        const obj = {
            method: (arg1: any, arg2: any) => {
                return arg1 + arg2;
            }
        };

        const promise = Q(obj).post("method", []);
        return promise.then((result: any) => {
            expect(true).toBe(false); // this should not be reached
        }).catch((error: any) => {
            expect(error).not.toBeNull();
        });
    });
});