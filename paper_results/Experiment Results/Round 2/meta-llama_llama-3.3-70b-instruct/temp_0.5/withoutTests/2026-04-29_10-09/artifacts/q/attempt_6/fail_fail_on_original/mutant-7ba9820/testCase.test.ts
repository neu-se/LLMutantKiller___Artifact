import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should invoke the ninvoke method correctly and return a promise', () => {
        const promise = Q();
        const name = 'testMethod';
        const args = ['arg1', 'arg2'];

        const result = promise.ninvoke(name, ...args);
        expect(typeof result.then).toBe('function');
        expect(typeof result.catch).toBe('function');
        result.then(() => {
            throw new Error('This should not be called');
        }).catch((error) => {
            expect(error.message).toBe('This should not be called');
        });
    });
});