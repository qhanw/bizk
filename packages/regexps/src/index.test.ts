import { idCard } from './';

describe('idCardRegexp', () => {
  test('合格的身份证号', () => {
    expect(idCard.test('142701199309095656')).toEqual(true);
  });

  test('月不正确', () => {
    expect(idCard.test('142701199313095656')).toEqual(false);
  });

  test('日不正确', () => {
    expect(idCard.test('142701199312565656')).toEqual(false);
  });

  test('合格的身份证号，最后一位x', () => {
    expect(idCard.test('14270119930909565X')).toEqual(true);
    expect(idCard.test('14270119930909565x')).toEqual(true);
  });

  test('存在非法字符', () => {
    expect(idCard.test('1427011993090a565X')).toEqual(false);
  });

  test('字符非18位', () => {
    expect(idCard.test('14270119')).toEqual(false);
  });
});
