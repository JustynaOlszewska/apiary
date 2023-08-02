export interface DataChart {
  labels: Labels[] | null;
  datasets: Datasets[];
}

export type Labels =
  | 'Wielkopolskie'
  | 'Warszawskie poszerzane'
  | 'Dadana'
  | 'Wielokorpusowe Ostrowskiej';
export interface Datasets {
  label: string;
  backgroundColor: string;
  data: number[] | null;
}
export interface InitChart {
  column: Columns[];
  rows: Rows[];
}
export interface Columns {
  align: string;
  field: string;
  label: string;
  name: string;
  required: boolean;
}
export interface Rows {
  calcium: string;
  calories: number;
  fat: number;
  hives: number;
  id: number;
  iron: string;
  name: string;
  protein: number;
  type: string;
}
export enum Pages {
  APIARIES = 'Apiaries',
  LOGIN = 'Login',
  REGISTER = 'Register',
  BEEHIVES = 'Beehives'
}
