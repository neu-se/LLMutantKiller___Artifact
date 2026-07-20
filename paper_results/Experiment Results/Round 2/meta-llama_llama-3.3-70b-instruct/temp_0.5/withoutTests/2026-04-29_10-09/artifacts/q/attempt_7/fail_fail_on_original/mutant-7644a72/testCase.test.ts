import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should create a promise with Q and throw a QReturnValue', () => {
        const Q = q.default || q;
        try {
            throw new (q as any).QReturnValue(10);
        } catch (e) {
            expect((e as any) instanceof (q as any).QReturnValue).toBe(true);
            expect((e as any).value).toBe(10);
        }
    });
});