import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q function post method', function () {
    it('should call a method on an object when the object has that method', function () {
        var obj = {
            myMethod: function() {
                return 'Hello World';
            }
        };

        return Q(obj).post('myMethod', [])
            .then(function (result) {
                expect(result).toBe('Hello World');
            });
    });
});