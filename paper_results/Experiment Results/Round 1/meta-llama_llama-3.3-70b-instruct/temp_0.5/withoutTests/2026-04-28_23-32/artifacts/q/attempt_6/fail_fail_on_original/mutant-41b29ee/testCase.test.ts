import { Q } from "../../../q.js";

describe("Q.all", () => {
    it("should resolve with an empty array when an empty array is passed", () => {
        return Q.all([]).then((values) => {
            expect(values).toEqual([]);
        });
    });
});