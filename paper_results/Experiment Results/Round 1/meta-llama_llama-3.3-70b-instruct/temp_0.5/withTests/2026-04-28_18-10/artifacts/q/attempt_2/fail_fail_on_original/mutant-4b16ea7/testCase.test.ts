import { Q } from "../../../q";

describe("Q library functionality", () => {
    it("should resolve promises correctly", () => {
        return Q(10).then((value: number) => {
            expect(value).toBe(10);
        });
    });
});