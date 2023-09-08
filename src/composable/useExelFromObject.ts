import * as XLSX from 'xlsx';
import { cloneDeep } from 'lodash';
import { ApiaryData } from '@interfaces/apiary';
import { ColInfo } from 'xlsx';
import { Ref } from 'vue';
export function useExelFromObject(
  unnecessaryKeys: Array<string>,
  keyToCountMaxWidth: Array<string>,
  dataApiary: Ref<ApiaryData[]>
) {
  const getExel = (fileExtention: string, fileName: string) => {
    const copyDataApiary = cloneDeep(dataApiary.value);
    unnecessaryKeys.map((key) => {
      copyDataApiary.forEach(
        (data: ApiaryData) => delete data[key as keyof typeof data]
      );
    });
    // const e = [{}, ...copyDataApiary];
    // const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(e);
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(copyDataApiary);

    // ws.push(XLSX.utils.decode_range('A1:E1'));
    // XLSX.utils.sheet_add_aoa(ws, 'ooooooooooooooooooo', {
    //   skipHeader: true, // Won't override headers
    //   origin: -1 // Add to the end
    // });
    const myNewData = [['My header']];
    XLSX.utils.sheet_add_aoa(ws, myNewData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'page 1');
    // XLSX.utils.sheet_add_aoa(
    //   ws,

    //   [['', 'Your', 'Desired data', 'd', 'd', 'd', 'd']],
    //   {
    //     skipHeader: true, // Won't override headers
    //     origin: -1 // Add to the end
    //   }
    // );
    const setMaxWidth = (name: string) => {
      return copyDataApiary.reduce(
        (accumulator: number, currentValue: ApiaryData) =>
          Math.max(
            accumulator,
            currentValue[name as keyof typeof currentValue]?.toString()
              .length || 0
          ),
        10
      );
    };
    let maxWidths: ColInfo[] = [];

    keyToCountMaxWidth.map((key) => {
      const correctObject = key ? { wch: setMaxWidth(key) } : {};
      maxWidths = [correctObject, ...maxWidths];
      return maxWidths;
    });
    ws['!cols'] = maxWidths.reverse();

    return XLSX.writeFile(
      wb,
      fileName + '.' + fileExtention ||
        'MySheetName.' + (fileExtention || 'xlsx')
    );
  };
  return { getExel };
}
