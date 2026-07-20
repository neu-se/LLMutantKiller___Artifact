import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q function post method', function () {
    it('should call the post method with the provided name and arguments', function () {
        var obj = {
            myMethod: function(name, args) {
                return name + ' ' + args.join(' ');
            }
        };

        return Q.post(obj, 'myMethod', ['Hello', 'World'])
            .then(function (result) {
                expect(result).toBe('myMethod Hello World');
            });
    });

    it('should call the default method if no name is provided', function () {
        var obj = function(a, b, c) {
            return a + b + c;
        };

        return Q.post(obj, undefined, [1, 2, 3])
            .then(function (result) {
                expect(result).toBe(6);
            });
    });

    it('should reject if the object does not have the specified method', function () {
        var obj = {};

        return Q.post(obj, 'myMethod', ['Hello', 'World'])
            .then(function () {
                expect(true).toBe(false);
            }, function (error) {
                expect(error.message).toBe('Q can\'t post "myMethod" to an object that doesn\'t have method "myMethod"');
            });
    });
});