import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q post method", () => {
    it("should call a method on an object with the given name and arguments", () => {
        var obj = {
            method: function (a: number, b: number, c: number): number {
                return a + b + c;
            }
        };

        return q(obj).post("method", [1, 2, 3]).then(function (result: number) {
            expect(result).toBe(6);
        });
    });

    it("should work as apply when given no name", () => {
        return q(function (a: number, b: number, c: number): number {
            return a + b + c;
        }).post(undefined, [1, 2, 3]).then(function (sum: number) {
            expect(sum).toBe(6);
        });
    });
});