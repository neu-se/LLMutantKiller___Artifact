import { Q } from "../../../../../q";

describe("q", () => {
    it("should test the behavior of the mutated file", () => {
        const callback = function () { return "bar"; };
        const promise = Q("foo").fin(callback);
        return promise.then((value: any) => {
            expect(value).toBe("foo");
        });
    });
});