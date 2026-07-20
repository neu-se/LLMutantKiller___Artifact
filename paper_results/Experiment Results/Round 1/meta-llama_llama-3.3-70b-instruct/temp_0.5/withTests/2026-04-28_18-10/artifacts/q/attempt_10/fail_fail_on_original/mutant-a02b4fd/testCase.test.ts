import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("post function", () => {
    it("should check the condition in post function", () => {
        const obj = {
            add: (a: number, b: number) => {
                return a + b;
            }
        };
        const promise = Q(obj);
        return promise.post("add", [1, 2]).then((result: number) => {
            expect(result).toBe(3);
        });
    });
});