function buildTable(json1, headerlist, tableid, tableclass){
	if(json1[0]){
		if(headerlist === undefined){ headerlist = Object.keys(json1[0]); }
		retString = '<table';
		if(tableid != undefined){ retString += ' id="'+tableid+'"'; }
		if(tableclass != undefined){ retString += ' class="'+tableclass+'"'; }
		retString += "><thead><tr>";
		for(var i = 0;i<headerlist.length;i++){	retString += "<th>"+headerlist[i]+"</th>"; }
		retString += "</tr></thead><tbody>";
		for(var x=0;x<json1.length;x++){
			retString += "<tr>";
			for(var i=0;i<headerlist.length;i++){
				if(json1[x][headerlist[i]]){
					retString += "<td>"+json1[x][headerlist[i]]+"</td>";
				} else {
					retString += "<td></td>";
				}
			}
			retString += "</tr>";
		}
		retString += "</tbody></table>";
		return retString;
	} else {
		return;
	}
}
function scrollTable(targetTable){
	if(targetTable === undefined){ throw 'No table provided.'; }
	var target = document.getElementById(targetTable);
	var tableOuterWrap = document.createElement('div');
	var tableInnerWrap = document.createElement('div');
	tableOuterWrap.id = targetTable + '-outerWrap';
	tableOuterWrap.className = 'tableouterwrap';
	tableInnerWrap.id = targetTable + '-innerWrap';
	tableInnerWrap.className = 'tableinnerwrap';
	target.parentNode.insertBefore(tableInnerWrap,target);
	tableInnerWrap.appendChild(target);
	tableInnerWrap.parentNode.insertBefore(tableOuterWrap,tableInnerWrap);
	tableOuterWrap.appendChild(tableInnerWrap);

	function copyIt(){
		if(document.contains(document.getElementById(targetTable+'-clone'))){ document.getElementById(targetTable+'-clone').remove(); }
		target.getElementsByTagName('thead')[0].style.display = "unset";
		var tableCopy = target.cloneNode(true);
		var srcTbody = tableCopy.getElementsByTagName('tbody');
		var emptyTbody = document.createElement('tbody');
		tableCopy.replaceChild(emptyTbody, srcTbody[0]);
		tableCopy.id = targetTable+'-clone';
		tableCopy.className = 'tableHeaderRowWrap';
		target.getElementsByTagName('thead')[0].style.display = "none";
		tableOuterWrap.prepend(tableCopy);

		var widthTarg = target.getElementsByTagName('tbody')[0];
		var widthTargKids = widthTarg.children[0].children;
		for(var i=0; i<widthTargKids.length;i++){
			if(widthTargKids[i].clientWidth > tableCopy.children[0].children[0].children[i].clientWidth) {
				tableCopy.children[0].children[0].children[i].style.width = widthTargKids[i].clientWidth;
				widthTargKids[i].style.width = widthTargKids[i].clientWidth;
			} else {
				tableCopy.children[0].children[0].children[i].style.width = tableCopy.children[0].children[0].children[i].clientWidth;
				widthTargKids[i].style.width = tableCopy.children[0].children[0].children[i].clientWidth;
			}
		}
		tableCopy.style.width = tableInnerWrap.clientWidth;
		var targetTheads = target.getElementsByTagName('thead')[0].getElementsByTagName('tr')[0].getElementsByTagName('th');
		var cloneTheads = tableCopy.getElementsByTagName('thead')[0].getElementsByTagName('tr')[0].getElementsByTagName('th');
		for(var i=0;i<targetTheads.length;i++){
			try{throw i}
			catch(ii) {
				cloneTheads[i].addEventListener("click", 
					function(){ 
						var clickTarget = target.getElementsByTagName('thead')[0].getElementsByTagName('tr')[0].getElementsByTagName('th')[ii].getElementsByTagName('a')[0];
						try { 
							clickTarget.click(); 
							copyIt();
						}
						catch(e) { }
					}
				);
			}
		}

	}
	copyIt();
}

function table2csv(tableName, fileName){
	var results = [];
	var targetTable = document.getElementById(tableName);
	var zeroLeadNum = /^0[\d\.]+$/;
	if(targetTable && targetTable.rows.length > 0){
		for(var x=0;x<targetTable.rows.length;x++){
			var thisrow = [], columns = targetTable.rows[x].querySelectorAll("td, th");
			for(var y=0;y<columns.length;y++){ if(columns[y].innerText.match(zeroLeadNum)){ thisrow.push('="'+columns[y].innerText+'"'); } else { thisrow.push('"'+columns[y].innerText+'"'); }}
			results.push(thisrow.join());
		}
	}
	var csv = results.join("\n");
	console.log(csv);

	var downloadAnchor, downloadFile = new Blob([csv], {type: "text/csv;"});

	downloadAnchor = document.createElement("a");
	downloadAnchor.download = fileName;
	downloadAnchor.href = window.URL.createObjectURL(downloadFile);

	downloadAnchor.style.display = "none";
	document.body.appendChild(downloadAnchor);

	downloadAnchor.click();
}


function scrollCSS(targetTable) {
	var target = document.getElementById(targetTable);
	var headers = target.getElementsByTagName('thead')[0].getElementsByTagName('tr')[0].getElementsByTagName('th');
	var headers2 = target.getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td');
	target.style.tableLayout = "auto";
	var headersizes = [];
	for(var i=0;i<headers.length;i++){headersizes[i] = window.getComputedStyle(headers[i]).width; }
	console.log(headersizes);
	target.style.tableLayout = "fixed";
	for(var i=0;i<headers.length;i++){ headers[i].width = headersizes[i];	}
	for(var i=0;i<headers2.length;i++){ headers2[i].width = headersizes[i];	}
	target.style.borderCollapse = "collapse";
	target.getElementsByTagName('thead')[0].getElementsByTagName('tr')[0].style.display = "block";
	target.getElementsByTagName('thead')[0].getElementsByTagName('tr')[0].style.position = "relative";
	target.getElementsByTagName('tbody')[0].style.display = "block";
	target.getElementsByTagName('tbody')[0].style.overflow = "auto";
	target.getElementsByTagName('tbody')[0].style.width = "100%";
	target.getElementsByTagName('tbody')[0].style.height = "200px";
}
