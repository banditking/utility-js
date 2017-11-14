jQuery.fn.dateValidate = function(){
	var vdate = $(this[0]);
	vdate.attr("placeholder", "mm/dd/yyyy");
	vdate.attr("maxlength", "10");
	vdate.on('input', function() {
		vdate.val(vdate.val().replace(/[^\d\/]/g, ''));
		if(vdate.val().length>2 && vdate.val().slice(2,3)!="/" && vdate.val().slice(0,2).indexOf("/")==-1){vdate.val(vdate.val().slice(0,2)+"/"+vdate.val().slice(2));}
		if(vdate.val().length>5 && vdate.val().slice(5,6)!="/" && vdate.val().split("/").length<3){vdate.val(vdate.val().slice(0,5)+"/"+vdate.val().slice(5));}
		workingdate=vdate.val().split("/", 3);
		resultingdate = workingdate;
		maxDays = 31;
		if(workingdate.length>1 || (workingdate.length==1 && workingdate[0].length>1)){
			if(workingdate[0]==""){resultingdate[0]="12";} else if (parseInt(workingdate[0])<=1){resultingdate[0]="01";} else if(parseInt(workingdate[0])>12){resultingdate[0]="12";}
			else if (parseInt(workingdate[0])<10 && parseInt(workingdate[0])>1){resultingdate[0]="0"+parseInt(workingdate[0]);} else {resultingdate[0] = workingdate[0];}
		}
		months31 = ["01","03","05","07","08","10","12"];
		months30 = ["04","06","09","11"];
		leapYear = 1;
		if(workingdate[2] && workingdate[2].length==4){
			if(parseInt(workingdate[2])%4!==0){leapYear=0;} else if(parseInt(workingdate[2])%100!==0){leapYear=1;} else if(parseInt(workingdate[2])%400!==0){leapYear=0;} else {leapYear=1;}
		}
		if(months31.indexOf(resultingdate[0])!=-1){maxDays = 31;} else if(months30.indexOf(resultingdate[0])!=-1){maxDays = 30;} else if(resultingdate[0]=="02" && leapYear==0){maxDays=28;} else {maxDays=29;}
		if(workingdate.length>2 || (workingdate.length==2 && workingdate[1].length>1)){
			if(workingdate[1]==""){resultingdate[1]=maxDays;} else if (workingdate[1]<1){resultingdate[1]="01";} else if(workingdate[1]>maxDays){resultingdate[1]=maxDays;}
			else if (workingdate[1]<10 && workingdate[1]>1){resultingdate[1]="0"+parseInt(workingdate[1]);} else {resultingdate[1] = workingdate[1];}
		}
		displaydate=resultingdate[0];
		if(workingdate.length>1){displaydate=displaydate+"/"+resultingdate[1];}
		if(workingdate.length>2){displaydate=displaydate+"/"+resultingdate[2];}
		vdate.val(displaydate);
	});
	vdate.on('blur', function() {
		if(vdate.val().length==0){vdate.css("backgroundColor","");} else if(/^\d{2}\/\d{2}\/\d{4}$/.test(vdate.val())){vdate.css("backgroundColor","#bfedbb");} else {
			for(i=0;i<3;i++){
				vdate.css("backgroundColor","#ff9999").delay(300).queue(function(next){vdate.css("backgroundColor","transparent");next();}).delay(300).queue(function(next){vdate.css("backgroundColor","#ff9999");next();});
			}
		}
	});
		
}
