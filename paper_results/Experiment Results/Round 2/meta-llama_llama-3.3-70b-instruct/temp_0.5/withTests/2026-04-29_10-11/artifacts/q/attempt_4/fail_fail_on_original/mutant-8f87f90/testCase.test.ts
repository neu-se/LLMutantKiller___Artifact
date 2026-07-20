import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q function post method', function () {
    it('should throw an error when no name is given and the object does not have a post method', function () {
        var obj = {};

        return Q(obj).post(undefined, [1, 2, 3])
            .then(function () {
                expect(true).toBe(false);
            }, function (error) {
                expect(error).toBeInstanceOf(Error);
            });
    });
});