import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return a promise when given a value', () => {
        const promise = q(5);
        expect((promise.inspect() as any).state).toBe("fulfilled");
        expect((promise.inspect() as any).value).toBe(5);
    });
});