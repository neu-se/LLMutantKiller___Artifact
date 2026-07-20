import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should create a promise with Q and have QReturnValue defined', () => {
        const Q = q.default || q;
        const promise = Q(10);
        expect(promise.inspect().state).toBe('fulfilled');
        expect(promise.inspect().value).toBe(10);
        expect(q.QReturnValue).toBeDefined();
    });
});