import XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const useCreateSS = () => {
	// This s2ab function converts from binary data to octet as this is what excel uses.

	function s2ab(sheet) {
		var arrayBuffer = new ArrayBuffer(sheet.length); //convert sheet to arrayBuffer
		var view = new Uint8Array(arrayBuffer); //create uint8array as viewer
		for (var i = 0; i < sheet.length; i++) view[i] = sheet.charCodeAt(i) & 0xff; //convert to octet
		return arrayBuffer;
	}

	function createSS(aoa, name) {
		//Create a workbook
		let workbook = XLSX.utils.book_new();

		//add some details to the workbook
		workbook.Props = {
			Title: 'Event reviews',
			Subject: name,
			Author: 'Rosie Osborne',
			CreatedDate: new Date(),
		};

		workbook.SheetNames.push('Reviews');

		let wsheet = XLSX.utils.aoa_to_sheet(aoa);
		workbook.Sheets['Reviews'] = wsheet;
		// workbook.Sheets['Reviews'].

		let WorkBookOut = XLSX.write(workbook, {
			bookType: 'xlsx',
			type: 'binary',
		});

		let arrayBuffer = s2ab(WorkBookOut);

		saveAs(
			new Blob([arrayBuffer], { type: 'application/octet-stream' }),
			`${name}.xlsx`
		);
	}

	return [createSS];
};

export { useCreateSS };
