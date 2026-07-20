import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q tests", () => {
    it("should return object keys", async () => {
        const obj = { a: 1, b: 2, c: 3 };
        const keys = await Q(obj).keys();
        expect(keys).toEqual(["a", "b", "c"]);
    });
});