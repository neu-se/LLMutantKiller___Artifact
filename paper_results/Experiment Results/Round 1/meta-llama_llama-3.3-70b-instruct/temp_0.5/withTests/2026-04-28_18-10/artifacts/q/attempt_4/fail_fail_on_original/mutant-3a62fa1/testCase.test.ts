import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should set isNodeJS to true when process is an object with nextTick', () => {
        const originalProcess = global.process;
        global.process = { nextTick: () => {} };
        
        const promise = Q.defer();
        Q.nextTick(() => {
            promise.resolve('resolved');
        });
        
        global.process = originalProcess;
        
        return promise.promise.then((value) => {
            expect(value).toBe('resolved');
        });
    });

    it('should not set isNodeJS to true when process is not an object', () => {
        const originalProcess = global.process;
        global.process = undefined;
        
        const promise = Q.defer();
        Q.nextTick(() => {
            promise.resolve('resolved');
        });
        
        global.process = originalProcess;
        
        return promise.promise.then((value) => {
            expect(value).not.toBe('resolved');
        });
    });
});