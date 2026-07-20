import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of Q.keys", () => {
        expect(typeof Q.keys).toBe('function');
        var obj = { a: 1, b: 2 };
        try {
            Q.keys(obj);
        } catch (e) {
            expect(e).toBeInstanceOf(Error);
        }
    });
});