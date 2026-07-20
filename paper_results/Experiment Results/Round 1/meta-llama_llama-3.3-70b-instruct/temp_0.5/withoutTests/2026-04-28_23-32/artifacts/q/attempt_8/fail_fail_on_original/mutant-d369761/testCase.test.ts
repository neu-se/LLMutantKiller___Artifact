import { Q } from '../../../../q.js'; // adjust the path according to your directory structure

describe("Q tests", () => {
    it("should return object keys", async () => {
        const obj = { a: 1, b: 2, c: 3 };
        const promise = Q(obj).dispatch("keys", []);
        const result = await promise;
        expect(result).toEqual(["a", "b", "c"]);
    });
});