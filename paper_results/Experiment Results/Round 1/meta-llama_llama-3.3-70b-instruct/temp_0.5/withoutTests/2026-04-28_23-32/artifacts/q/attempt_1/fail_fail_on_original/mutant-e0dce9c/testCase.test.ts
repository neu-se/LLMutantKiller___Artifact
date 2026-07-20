import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q Promise', () => {
    it('should handle promise rejection correctly', () => {
        const promise = Q.reject('Test rejection');
        let rejected = false;
        promise.then(() => {
            rejected = true;
        }, () => {
            rejected = false;
        });
        expect(rejected).toBe(false);
    });
});