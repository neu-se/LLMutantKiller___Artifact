import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should create a promise with Q', () => {
        const promise = (Q as any)(10);
        expect((promise as any).inspect().state).toBe('fulfilled');
        expect((promise as any).inspect().value).toBe(10);
    });
});