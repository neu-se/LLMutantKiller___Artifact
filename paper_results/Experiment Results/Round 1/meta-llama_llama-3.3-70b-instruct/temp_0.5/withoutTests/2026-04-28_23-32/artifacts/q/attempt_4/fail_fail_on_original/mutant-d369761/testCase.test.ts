import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q tests", () => {
    it("should return object keys", async () => {
        const obj = { a: 1, b: 2, c: 3 };
        const promise = Q(obj).dispatch("keys", []);
        const result = await promise;
        expect(result).toEqual(["a", "b", "c"]);
    });
});