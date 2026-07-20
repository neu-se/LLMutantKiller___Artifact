import * as q from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should handle done method correctly', () => {
        const promise = q.Q(1);
        let result: any;
        promise.done((value) => {
            result = value;
        }, (error) => {
            throw error;
        });
        expect(result).toBe(1);
    });
});