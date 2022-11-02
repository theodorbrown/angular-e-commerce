export const phoneConfig = [
  {country: 'FR', code: 33, minlength: 9, maxlength: 9},
  {country: 'DE', code: 49, minlength: 3, maxlength: 12},
  {country: 'BE', code: 32, minlength: 8, maxlength: 10},
  {country: 'LU', code: 352, minlength: 4, maxlength: 12},
  {country: 'AT', code: 43, minlength: 4, maxlength: 13},
];

export let defaultPhoneDetails = {
  code: phoneConfig[0].code,
  country: phoneConfig[0].country,
  minlength: phoneConfig[0].minlength,
  maxlength: phoneConfig[0].maxlength,
  phone: ''
}
