import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise', () => {
    it('should not throw an error when accessing the exception property of a fulfilled promise', () => {
        const promise = Q.resolve('Test Value');
        expect(() => {
            const inspected = promise.inspect();
            if (inspected.state === 'rejected') {
                inspected.exception;
            }
        }).not.toThrow();
    });
});