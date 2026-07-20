import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should dispatch a message to an object', () => {
        const object = {
            dispatch: jest.fn(),
        };

        Q(object).dispatch('op', ['arg1', 'arg2']);

        expect(object.dispatch).toHaveBeenCalledTimes(1);
        expect(object.dispatch).toHaveBeenCalledWith('op', ['arg1', 'arg2']);
    });
});