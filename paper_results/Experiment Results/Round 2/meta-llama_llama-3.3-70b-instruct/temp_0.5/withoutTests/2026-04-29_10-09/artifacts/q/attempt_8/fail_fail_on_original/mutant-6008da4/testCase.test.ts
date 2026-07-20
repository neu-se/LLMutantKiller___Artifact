import { Q } from "./q";

describe('Q', () => {
    it('should call the nextTick function with the correct arguments', () => {
        // Act
        const nextTickSpy = jest.fn();
        Q.nextTick(nextTickSpy);

        // Assert
        expect(nextTickSpy).toHaveBeenCalledTimes(1);
    });
});