import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q function post method', function () {
    it('should call a function when no name is provided', function () {
        var obj = function(a, b, c) {
            return a + b + c;
        };

        return Q(obj).post(null, [1, 2, 3])
            .then(function (result) {
                expect(result).toBe(6);
            });
    });
});