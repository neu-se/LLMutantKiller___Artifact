import { Q } from "../q";

describe("q", () => {
    it("should test the behavior of the mutated file", () => {
        const promise = Q("foo").fin(() => { });
        return promise.then((value: any) => {
            expect(value).toBe("foo");
        });
    });
});