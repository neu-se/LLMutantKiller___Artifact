import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q tests", () => {
    it("should return object keys", () => {
        const obj = { a: 1, b: 2, c: 3 };
        const promise = Q(obj).dispatch("keys", []);
        const result = promise.inspect().value;
        expect(result).toEqual(["a", "b", "c"]);
    });
});