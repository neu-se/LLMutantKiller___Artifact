import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q function post method', function () {
    it('should call a method on an object when the name is provided', function () {
        var obj = {
            myMethod: function(args) {
                return args.join(' ');
            }
        };

        return Q(obj).post('myMethod', ['Hello', 'World'])
            .then(function (result) {
                expect(result).toBe('Hello World');
            });
    });
});