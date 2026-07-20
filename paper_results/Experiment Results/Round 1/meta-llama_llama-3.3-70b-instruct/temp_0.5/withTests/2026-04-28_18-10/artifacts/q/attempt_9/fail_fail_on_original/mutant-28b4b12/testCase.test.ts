import { Q } from "../../../../../../../../subject_repositories/q/q.js";

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
});