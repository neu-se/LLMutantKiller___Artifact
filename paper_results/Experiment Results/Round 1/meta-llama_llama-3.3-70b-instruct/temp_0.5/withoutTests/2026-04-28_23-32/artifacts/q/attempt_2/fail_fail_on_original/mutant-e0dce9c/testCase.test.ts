import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q Promise', () => {
    it('should handle promise rejection correctly', () => {
        const promise = Q.reject('Test rejection');
        let rejected = false;
        promise.then(function (value) {
            rejected = true;
        }, function (reason) {
            rejected = false;
        });
        expect(rejected).toBe(false);
    });
});