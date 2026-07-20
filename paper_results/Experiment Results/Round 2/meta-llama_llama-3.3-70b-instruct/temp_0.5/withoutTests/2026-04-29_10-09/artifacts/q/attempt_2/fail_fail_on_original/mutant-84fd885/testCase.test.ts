import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.nsend', () => {
    it('should call the method with the provided arguments', () => {
        const object = {
            method: jest.fn(),
        };

        const name = 'method';
        const arg1 = 'arg1';
        const arg2 = 'arg2';

        const deferred = Q.defer();
        Q.nsend(object, name, arg1, arg2);
        const nodeArgs = [arg1, arg2, deferred.makeNodeResolver()];

        expect(object.method).toHaveBeenCalledTimes(1);
        expect(object.method).toHaveBeenCalledWith(...nodeArgs);
    });
});