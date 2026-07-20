import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should throw an error when deleting a property with an empty string", () => {
        const obj = { a: 1, b: 2 };
        return Q(obj).del("").then(() => {
            expect(true).toBe(false);
        }).catch((error) => {
            expect(error).toBeInstanceOf(Error);
        });
    });
});