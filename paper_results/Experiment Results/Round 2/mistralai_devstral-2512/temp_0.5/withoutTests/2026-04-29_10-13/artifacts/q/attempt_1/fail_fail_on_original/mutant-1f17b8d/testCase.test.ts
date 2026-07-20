import { Q } from "./q.js";

describe("Q.all behavior with non-promise values", () => {
    it("should resolve when given an array containing non-promise values", (done) => {
        const input = [1, 2, 3];
        Q.all(input).then((result) => {
            expect(result).toEqual([1, 2, 3]);
            done();
        }).catch((error) => {
            done(error);
        });
    });
});