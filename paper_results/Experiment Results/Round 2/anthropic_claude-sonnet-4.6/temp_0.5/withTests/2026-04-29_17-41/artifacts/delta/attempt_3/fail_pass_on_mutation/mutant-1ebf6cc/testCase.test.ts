import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import { Op } from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Op.length() with object retain', () => {
  it('correctly returns 1 for a retain embed op used in compose', () => {
    const a = new Delta().retain({ figure: true }, { src: 'http://quilljs.com/image.png' });
    const b = new Delta().retain(1, { alt: 'logo' });
    const expected = new Delta().retain(
      { figure: true },
      { src: 'http://quilljs.com/image.png', alt: 'logo' },
    );
    expect(a.compose(b)).toEqual(expected);
  });
});