import { Q } from "../../../q.js";

describe("Q", () => {
    it("should delete a property from an object", () => {
        const obj = { a: 1, b: 2 };
        Q(obj).del("a").then(() => {
            expect(Object.keys(obj)).toEqual(['b']);
        });
    });
});