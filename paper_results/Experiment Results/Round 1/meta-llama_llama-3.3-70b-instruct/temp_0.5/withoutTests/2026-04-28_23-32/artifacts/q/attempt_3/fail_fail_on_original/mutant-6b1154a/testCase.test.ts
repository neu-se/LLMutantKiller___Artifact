import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q promise library', () => {
    it('should handle done method correctly', () => {
        var promise = Q(true);
        var result = false;
        promise.done(function () {
            result = true;
        }, function () {
            result = false;
        }, function () {
            result = 'progress';
        });
        Q.nextTick(function () {
            expect(result).not.toBe('progress');
        });
    });
});