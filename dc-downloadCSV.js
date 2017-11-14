function downloadCSV(csv, filename) {
	var csvFile;
	var downloadLink;

	// CSV file
	csvFile = new Blob([csv], {type: "text/csv"});
	
	// Download link
	downloadLink = document.createElement("a");

	// File name
	downloadLink.download = filename;

	// Create a link to the file
	downloadLink.href = window.URL.createObjectURL(csvFile);

	// Hide download link
	downloadLink.style.display = "none";

	// Add the link to DOM
	document.body.appendChild(downloadLink);

	// Click download link
	downloadLink.click();
}

function exportTableToCSV(tablename, filename) {
	var csv = [];
	console.log(tablename);
	var rows = document.querySelectorAll("table#" + tablename + " tr");

	for (var i = 0; i < rows.length; i++) {
		var row = [], cols = rows[i].querySelectorAll("td, th");

		for (var j = 0; j < cols.length; j++) {
			if(cols[j].innerText.indexOf(',') > -1){ 
				row.push('"' + cols[j].innerText + '"'); 
			} else { 
				row.push(cols[j].innerText); 
			}
		}

		csv.push(row.join(","));        
	}

	// Download CSV file
	downloadCSV(csv.join("\n"), filename);
}

//code found at https://www.codexworld.com/export-html-table-data-to-csv-using-javascript/
