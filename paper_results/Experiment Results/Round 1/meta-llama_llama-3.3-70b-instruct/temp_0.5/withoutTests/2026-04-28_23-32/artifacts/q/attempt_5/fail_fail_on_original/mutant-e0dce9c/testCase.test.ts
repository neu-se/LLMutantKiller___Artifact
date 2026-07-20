import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q Promise', () => {
    it('should handle promise rejection correctly', () => {
        const promise = Q.reject('Test rejection');
        let rejectedValue: any;
        promise.then(() => {
            rejectedValue = 'fulfilled';
        }, (reason: any) => {
            rejectedValue = reason;
        });
        expect(rejectedValue).toBe('Test rejection');
    });
});