import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return a promise when given a value', () => {
        const promise = q(5);
        if ((promise.inspect() as any).state === "fulfilled") {
            expect((promise.inspect() as any).value).toBe(5);
        } else {
            expect(true).toBe(false);
        }
    });
});