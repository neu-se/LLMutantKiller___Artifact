import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should delete a property from an object", () => {
        const obj = { a: 1, b: 2 };
        return Q(obj).del("a").then((value) => {
            expect(value).toBeUndefined();
            expect("a" in obj).toBe(false);
        });
    });
});