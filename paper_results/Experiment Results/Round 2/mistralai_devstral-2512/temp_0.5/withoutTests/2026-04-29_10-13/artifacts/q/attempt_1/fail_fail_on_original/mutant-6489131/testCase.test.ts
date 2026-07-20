import { Q } from "./q.js";

describe("Q.reduce behavior with empty array", () => {
    it("should throw TypeError when reducing empty array without initial value", () => {
        expect(() => {
            Q([]).then(function (arr) {
                return arr.reduce(function (acc, val) {
                    return acc + val;
                });
            });
        }).rejects.toThrow(TypeError);
    });
});