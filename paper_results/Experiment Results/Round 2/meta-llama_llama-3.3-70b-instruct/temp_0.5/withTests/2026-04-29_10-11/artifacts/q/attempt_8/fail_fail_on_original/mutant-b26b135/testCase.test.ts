import { Q } from "./q.js";

describe("Q", () => {
    it("should return the keys of an object", () => {
        const obj = { a: 1, b: 2 };
        return Q(obj).then((result) => {
            return result.keys();
        }).then((keys) => {
            expect(keys).toEqual(["a", "b"]);
        });
    });
});