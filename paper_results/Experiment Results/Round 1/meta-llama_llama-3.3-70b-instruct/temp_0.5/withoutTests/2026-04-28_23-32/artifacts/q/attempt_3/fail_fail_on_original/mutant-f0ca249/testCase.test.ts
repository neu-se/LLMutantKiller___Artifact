import { Q } from "./q";

describe("Q library", () => {
    it("should resolve promises correctly", () => {
        const promise = Q([1, 2, 3]);
        const result = promise.then((value: any[]) => value.reduce((a: number, b: number) => a + b, 0));
        return result.then((sum: number) => {
            expect(sum).toBe(6);
        });
    });
});