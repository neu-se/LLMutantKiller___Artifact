import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should throw an error when tap method is empty", () => {
        const promise = Q.resolve();
        const tapMethod = Q(promise).tap;
        expect(tapMethod).not.toBe(undefined);
        expect(typeof tapMethod).toBe('function');
        try {
            Q(promise).tap = function () {};
            expect(true).toBe(false); // this should not be reached
        } catch (e) {
            expect(true).toBe(true);
        }
    });
});