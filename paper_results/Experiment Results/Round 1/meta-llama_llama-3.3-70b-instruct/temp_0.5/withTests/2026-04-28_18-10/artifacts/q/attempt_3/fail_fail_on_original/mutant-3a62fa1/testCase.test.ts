import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should resolve promise with process.nextTick', () => {
        const promise = Q.defer();
        Q.nextTick(() => {
            promise.resolve('resolved');
        });
        
        return promise.promise.then((value) => {
            expect(value).toBe('resolved');
        });
    });

    it('should set isNodeJS to true when process.nextTick is available', () => {
        const originalProcess = global.process;
        global.process = { nextTick: () => {} };
        
        const isNodeJS = Q.nextTick(() => {}).isNodeJS;
        
        global.process = originalProcess;
        
        expect(isNodeJS).toBe(true);
    });
});