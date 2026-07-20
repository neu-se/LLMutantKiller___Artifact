import { Q } from "../../../q";

describe("Q", () => {
    it("should return the keys of an object", () => {
        const obj = { a: 1, b: 2 };
        return Q(obj).keys().then((keys) => {
            expect(keys).toEqual(Object.keys(obj));
        });
    });
});