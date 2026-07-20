import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q tests", () => {
    it("should return object keys", () => {
        const obj = { a: 1, b: 2, c: 3 };
        const promise = Q(obj).keys();
        const result = promise.then((keys) => keys);
        expect(result).resolves.toContain("a");
        expect(result).resolves.toContain("b");
        expect(result).resolves.toContain("c");
    });
});