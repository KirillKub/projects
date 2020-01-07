import { rgbToHex } from '../color/rgbToHex';

const black = 'rgb(0, 0, 0)';
const white = 'rgb(255, 255, 255)';

describe('color', () =>{
  test('rgb(0, 0, 0) to equal #000000', () => {
    expect(rgbToHex(black)).toBe('#000000');
  });
  test('rgb(255, 255, 255) to equal #ffffff', () => {
    expect(rgbToHex(white)).toBe('#ffffff');
  });
});


