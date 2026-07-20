import { Q } from './q';

describe('Q promise library', () => {
    it('should handle done method correctly', () => {
        var promise = Q(true);
        var result = false;
        promise.done(function () {
            result = true;
        }, function () {
            result = false;
        });
        Q.nextTick(function () {
            expect(result).toBe(true);
        });
    });
});