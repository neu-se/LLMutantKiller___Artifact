import { Q } from "../../../../../q";

describe('Q', () => {
    it('should check if Q.nextTick uses process.nextTick', () => {
        const originalProcessNextTick = process.nextTick;
        let nextTickCalled = false;
        process.nextTick = () => {
            nextTickCalled = true;
        };
        
        Q.nextTick(() => {});
        
        expect(nextTickCalled).toBe(true);
        process.nextTick = originalProcessNextTick;
    });
});