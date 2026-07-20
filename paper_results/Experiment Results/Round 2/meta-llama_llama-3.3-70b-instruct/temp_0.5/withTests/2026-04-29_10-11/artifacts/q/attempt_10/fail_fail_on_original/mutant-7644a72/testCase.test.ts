import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', function () {
    it('should throw an error when trying to access QReturnValue if ReturnValue is not defined', function () {
        let q = Q(function () {
            return Q.return(10);
        });
        expect(q.then(function (value) {
            return value;
        })).resolves.toBe(10);
    });
});