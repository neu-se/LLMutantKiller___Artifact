import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q function post method', function () {
    it('should call the post method on an object', function () {
        var obj = {
            post: function(name, args) {
                return name + ' ' + args.join(' ');
            }
        };

        return Q.post(obj, 'myMethod', ['Hello', 'World'])
            .then(function (result) {
                expect(result).toBe('myMethod Hello World');
            });
    });
});