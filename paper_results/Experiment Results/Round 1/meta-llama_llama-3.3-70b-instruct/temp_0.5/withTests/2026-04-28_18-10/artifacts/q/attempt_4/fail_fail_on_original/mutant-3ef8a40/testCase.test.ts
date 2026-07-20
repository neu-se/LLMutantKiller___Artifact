import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.join', function () {
    it('should join two promises with the same value', function () {
        var x = Q(5);
        var y = Q(5);
        return Q.join(x, y).then(function (result: any) {
            expect(result).toBe(5);
        });
    });

    it('should reject if the promises do not have the same value', function () {
        var x = Q(5);
        var y = Q(10);
        return Q.join(x, y).then(function () {
            expect(true).toBe(false);
        }, function (error: any) {
            expect(error.message).toBe('Q can\'t join: not the same: 5 10');
        });
    });
});