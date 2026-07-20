import { Q } from "../../../q.js";

describe('Q.mapply', () => {
    it('should dispatch "post" operation', () => {
        const object = {
            dispatch: jest.fn(),
        };
        const name = 'test';
        const args = ['arg1', 'arg2'];

        Q.mapply(object, name, args);

        expect(object.dispatch).toHaveBeenCalledTimes(1);
        expect(object.dispatch).toHaveBeenCalledWith('post', [name, args]);
    });

    it('should throw an error for mutated code', () => {
        const object = {
            dispatch: jest.fn((op, args) => {
                if (op !== 'post') {
                    throw new Error('Invalid operation');
                }
            }),
        };
        const name = 'test';
        const args = ['arg1', 'arg2'];

        // Simulate mutated code
        const originalMapply = Q.mapply;
        Q.mapply = (object: any, name: any, args: any) => {
            return object.dispatch('', [name, args]);
        };

        expect(() => Q.mapply(object, name, args)).toThrow();

        // Restore original mapply function
        Q.mapply = originalMapply;
    });
});