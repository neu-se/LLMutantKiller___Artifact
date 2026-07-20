import q from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should handle done method correctly', () => {
        const promise = q(1);
        let result: any;
        promise.done((value) => {
            result = value;
        }, (error) => {
            throw error;
        }, () => {});
        expect(result).toBeUndefined();
        // Since the promise is already fulfilled, the done block should be executed in the next tick
        // We use setImmediate to simulate the next tick
        setImmediate(() => {
            expect(result).toBe(1);
        });
    });
});