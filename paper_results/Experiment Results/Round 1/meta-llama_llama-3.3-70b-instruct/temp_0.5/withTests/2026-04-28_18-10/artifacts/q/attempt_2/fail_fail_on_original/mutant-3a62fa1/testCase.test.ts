import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should not resolve promise with non-Node.js environment', () => {
        const originalProcess = global.process;
        delete global.process;
        
        const promise = Q.defer();
        Q.nextTick(() => {
            promise.resolve('resolved');
        });
        
        return promise.promise.then((value) => {
            expect(value).not.toBe('resolved');
        }).finally(() => {
            global.process = originalProcess;
        });
    });
});