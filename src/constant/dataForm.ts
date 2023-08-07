import imgUrlUnited from '@assets/images/united-kingdom.png';
import imgUrlUnitedPoland from '@assets/images/icons8-poland-30.png';
export const options = [
  {
    label: 'EN',
    value: 'en',
    icon: imgUrlUnited,
    hide: false
  },
  {
    label: 'PL',
    value: 'pl',
    icon: imgUrlUnitedPoland,
    hide: false
  },
  {
    label: 'DK',
    value: 'dk',
    icon: imgUrlUnited,
    hide: false
  }
];
export const apiary = {
  columns: [
    {
      name: 'desc',
      required: true,
      label: '',
      align: 'left',
      field: 'index'
    },
    {
      name: 'name',
      align: 'center',
      label: 'Name',
      field: 'name',
      sortable: true
    },
    { name: 'address', label: 'Address', field: 'address' },
    { name: 'type', label: 'Type', field: 'type' },
    { name: 'sun exposure', label: 'Sun exposure', field: 'sun' },
    { name: 'hives', label: 'Hives', field: 'hives' }
  ]
};
