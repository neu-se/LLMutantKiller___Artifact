import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should resolve promise when process is an object with nextTick', (done) => {
        if (typeof process === 'object' && process && process.nextTick) {
            let called = false;
            Q.nextTick(() => {
                called = true;
                done();
            });
            expect(called).toBe(false);
        } else {
            done();
        }
    });

    it('should call nextTick with process.nextTick when available', (done) => {
        const originalNextTick = Q.nextTick;
        const originalProcessNextTick = process.nextTick;
        
        let nextTickCalled = false;
        process.nextTick = () => {
            nextTickCalled = true;
        };
        
        Q.nextTick(() => {
            expect(nextTickCalled).toBe(true);
            done();
        });
        
        Q.nextTick = originalNextTick;
        process.nextTick = originalProcessNextTick;
    });
});