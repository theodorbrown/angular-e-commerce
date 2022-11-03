export type Phone = {
  country: string,
  code: string,
  minlength: number,
  maxlength: number
}

export const phoneSpecs: Phone[] = [
  {country: 'FR', code: '+33', minlength: 9, maxlength: 9},
  {country: 'DE', code: '+49', minlength: 3, maxlength: 12},
  {country: 'BE', code: '+32', minlength: 8, maxlength: 10},
  {country: 'LU', code: '+352', minlength: 4, maxlength: 12},
  {country: 'AT', code: '+43', minlength: 4, maxlength: 13},
];


