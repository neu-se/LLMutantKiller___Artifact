import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should handle fulfilled promise correctly', () => {
        const promise = Q(1);
        let result: any;
        promise.then((value) => {
            result = value;
        });
        expect(result).toBeUndefined();
        // Since the promise is already fulfilled, the then block should be executed in the next tick
        // We use setImmediate to simulate the next tick
        setImmediate(() => {
            expect(result).toBe(1);
        });
    });
});