import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('invert()', () => {
  it('calls embed handler invert with correct arguments', () => {
    const invertFn = jest.fn((a: string, b: string) => b);
    
    Delta.registerEmbed<string>('img', {
      compose: jest.fn((a: string, b: string) => b),
      invert: invertFn,
      transform: jest.fn((a: string, b: string) => b),
    });

    const delta = new Delta().retain({ img: 'new.jpg' });
    const base = new Delta().insert({ img: 'old.jpg' });
    
    delta.invert(base);
    
    expect(invertFn).toHaveBeenCalledWith('new.jpg', 'old.jpg');
    
    Delta.unregisterEmbed('img');
  });
});