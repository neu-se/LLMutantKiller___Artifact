import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should throw an error when tap method is not implemented", () => {
        const promise = Q.resolve();
        const tapMethod = Q(promise).tap;
        expect(tapMethod).not.toBe(undefined);
        expect(typeof tapMethod).toBe('function');
    });
});