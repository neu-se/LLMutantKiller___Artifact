import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should resolve promise when process is an object with nextTick', () => {
        const promise = Q.defer();
        Q.nextTick(() => {
            promise.resolve('resolved');
        });
        
        return promise.promise.then((value) => {
            expect(value).toBe('resolved');
        });
    });

    it('should not resolve promise when process is not an object with nextTick', () => {
        const originalProcess = global.process;
        global.process = undefined;
        
        const promise = Q.defer();
        const originalNextTick = Q.nextTick;
        Q.nextTick = () => {};
        
        Q.nextTick(() => {
            promise.resolve('resolved');
        });
        
        Q.nextTick = originalNextTick;
        global.process = originalProcess;
        
        return promise.promise.then((value) => {
            expect(value).not.toBe('resolved');
        });
    });
});