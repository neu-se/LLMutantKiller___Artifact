import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q Promise', () => {
    it('should handle promise rejection correctly', () => {
        const promise = Q.reject('Test rejection');
        let value: any;
        promise.then((val: any) => {
            value = val;
        }, (reason: any) => {
            value = reason;
        });
        expect(value).toBe('Test rejection');
    });
});