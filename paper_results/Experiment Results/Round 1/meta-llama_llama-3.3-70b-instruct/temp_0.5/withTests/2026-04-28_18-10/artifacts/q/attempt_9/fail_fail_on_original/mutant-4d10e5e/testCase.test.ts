import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should have different behavior when hasStacks is true or false", () => {
        var hasStacks = false;
        try {
            throw new Error();
        } catch (e) {
            if (e instanceof Error) {
                hasStacks = !!e.stack;
            }
        }
        expect(hasStacks).toBe(true);
        var error = new Error();
        var promise = Q(error);
        promise.then((value) => {
            expect(value).toBe(error);
        }, (err: Error) => {
            expect(err.stack).toBeDefined();
        });
    });
});