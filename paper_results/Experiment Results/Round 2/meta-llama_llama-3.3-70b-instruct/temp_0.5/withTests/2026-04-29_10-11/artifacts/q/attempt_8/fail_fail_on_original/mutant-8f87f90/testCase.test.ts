import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q function post method', function () {
    it('should call the post method with the provided name and arguments when the object has the method', function () {
        var obj = {
            myMethod: function(name, args) {
                return name + ' ' + args.join(' ');
            }
        };

        return Q.post(obj, 'myMethod', ['Hello', 'World'])
            .then(function (result) {
                expect(result).toBe('Hello World');
            });
    });
});