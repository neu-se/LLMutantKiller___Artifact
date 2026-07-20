import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q function post method', function () {
    it('should call the function with provided arguments when no name is given', function () {
        var obj = function(a, b, c) {
            return a + b + c;
        };

        return Q(obj).post(undefined, [1, 2, 3])
            .then(function (result) {
                expect(result).toBe(6);
            });
    });
});