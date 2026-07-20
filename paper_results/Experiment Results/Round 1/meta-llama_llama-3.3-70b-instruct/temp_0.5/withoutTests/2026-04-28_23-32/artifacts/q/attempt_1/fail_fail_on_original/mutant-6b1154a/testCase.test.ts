import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q promise library', () => {
    it('should handle then method correctly', () => {
        var promise = Q(true);
        var result = false;
        promise.then(function () {
            result = true;
        });
        expect(result).toBe(true);
    });
});