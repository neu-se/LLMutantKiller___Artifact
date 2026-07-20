import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should check if Q.nextTick uses process.nextTick', (done) => {
        const originalProcessNextTick = process.nextTick;
        let nextTickCalled = false;
        process.nextTick = () => {
            nextTickCalled = true;
        };
        
        Q.nextTick(() => {
            expect(nextTickCalled).toBe(true);
            process.nextTick = originalProcessNextTick;
            done();
        });
    });
});