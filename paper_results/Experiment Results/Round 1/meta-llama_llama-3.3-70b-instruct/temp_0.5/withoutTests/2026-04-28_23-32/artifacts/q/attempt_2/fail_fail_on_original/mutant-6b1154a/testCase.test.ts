import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q promise library', () => {
    it('should handle then method correctly', () => {
        var promise = Q(true);
        var result = false;
        promise.then(function () {
            result = true;
        });
        Q.nextTick(function () {
            expect(result).toBe(true);
        });
    });
});