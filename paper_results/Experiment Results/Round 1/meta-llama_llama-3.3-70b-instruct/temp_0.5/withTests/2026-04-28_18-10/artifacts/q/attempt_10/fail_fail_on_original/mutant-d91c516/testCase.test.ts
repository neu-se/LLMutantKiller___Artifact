import { Q } from "./q";

describe("Q", () => {
    it("should test the behavior of Q.keys", () => {
        var obj = { a: 1, b: 2 };
        var promise = Q(obj);
        expect(typeof promise.keys).toBe('function');
        var result = promise.keys();
        expect(result.then).toBeInstanceOf(Function);
    });
});