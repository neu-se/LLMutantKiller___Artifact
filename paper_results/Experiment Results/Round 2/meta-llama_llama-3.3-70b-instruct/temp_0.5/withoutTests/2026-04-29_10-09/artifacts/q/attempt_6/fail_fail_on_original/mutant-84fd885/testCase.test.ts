import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.nsend', () => {
    it('should pass arguments to the method', () => {
        const object = {
            method: jest.fn(),
        };

        const name = 'method';
        const arg1 = 'arg1';
        const arg2 = 'arg2';

        Q.nsend(object, name, arg1, arg2);

        expect(object.method).toHaveBeenCalledTimes(1);
        expect(object.method).toHaveBeenCalledWith(arg1, arg2, expect.any(Function));
    });

    it('should fail when arguments are not passed in the mutated code', () => {
        const object = {
            method: jest.fn(),
        };

        const name = 'method';
        const arg1 = 'arg1';
        const arg2 = 'arg2';

        // Simulate the mutated code
        const originalNsend = Q.nsend;
        Q.nsend = function(object, name) {
            object[name]();
        };

        expect(() => Q.nsend(object, name, arg1, arg2)).toThrow();

        // Restore the original Q.nsend
        Q.nsend = originalNsend;
    });
});