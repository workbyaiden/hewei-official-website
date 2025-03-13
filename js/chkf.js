
//檢查單一 E-mail 格式
function checkMail(form,value){

	var errorMsg='';

	if (!checkEMail(value)){
		errorMsg+='電子郵件格式不符\n';
	}

	if (errorMsg.length>0){
		alert(errorMsg);
	}else{
		form.submit();
	}
}


//不允許空白，至少輸入一個字元
function checkEmpty(form) {
	re = /^[^\s]+$/;

	if (re.test(form.value)){
		return true
	}else{
		return false
	}
}

//沒有限制，至少輸入一個字元
function checkAny(form) {
	re = /^[^\`]+$/;

	if (re.test(form.value)){
		return true
	}else{
		return false
	}
}

//只允許輸入中文字
function checkChinese(form) {
	re = /^[\u0391-\uFFE5]+$/i;

	if (re.test(form.value)){
		return true
	}else{
		return false
	}
}

//只允許輸入數字
function checkDigit(form) {
	re = /^[0-9]+$/i;

	if (re.test(form.value)){
		return true
	}else{
		return false
	}
}

//只允許輸入英文字母
function checkAlpha(form){
	re = /^[a-zA-Z]+$/i;
	
	if (re.test(form.value)){
		return true
	}else{
		return false
	}
}

//只允許輸入英文字母或數字
function checkEng(form) {
	re = /^[\w]+$/i;

	if (re.test(form.value)){
		return true
	}else{
		return false
	}
}

//帳號密碼： 只允許輸入英文字母或數字, N 個字元以上
function checkPasswd(form) {
	re = /^[\w]{8,}$/i;

	if (re.test(form.value)){
		return true
	}else{
		return false
	}
}

//只允許輸入英文字母、數字或標準符號
function checkEngAll(form) {
	re = /^[^\u0391-\uFFE5]+$/i;

	if (re.test(form.value)){
		return true
	}else{
		return false
	}
}

// HTMLArea 字數限制
function checkHTMLAreaLens(form,lens){
	
    val = editor.getText();  //editor為HTMLArea的全域變數，類型為Object
    
    if(val.length > lens){
		return true
	}else{
		return false
	}
}

//檢查 E-mail
function checkEMail(form){
	re = /^[^\s]+@[^\s]+\.[^\s]+$/ig;
	
	if (re.test(form.value)){
		return true
	}else{
		return false
	}
}

//檢查台灣行動電話
function checkTWcellphone(form) {
	re = /^09[0-9]{8}$/i;

	if (re.test(form.value)){
		return true
	}else{
		return false
	}
}

//檢查電話
function checkTEL(form) {
	re = /^[0-9]{1,3}-\d+$/i;

	if (re.test(form.value)){
		return true
	}else{
		return false
	}
}

//檢查選項按鈕(單選)
function checkRadio(form){
	var chk=false;

	for (var i=0;i<form.length;i++){
		if (form[i].checked){
			chk=true;
		}
	}

	if (chk){
		return true
	}else{
		return false
	}
}

//檢查核取方塊 form: 欄位名稱 count: 勾選數量上限 chktype: 單選或多選(1:單選, 2:多選)
function checkCheckBox(form,count,chktype){
	var chk = 0;

	if (chktype == 1) { //1 - 單選
		if (form.checked == true) {
			return true
		}
		else{
			return false
		}
	} else { //2 - 多選
		for (var i=0;i<form.length;i++){
			if (form[i].checked){
				chk++;
			}
		}

		if (count == 0){ //0 - 表示無上限
			if (chk > 0){
				return true
			}
			else{
				return false
			}
		}
		else {
			if (chk>0 && chk<=count){
				return true
				}
			else{
				return false
			}
		}
	}
}

//檢查下拉選單
function checkSelect(form){
	var sIndex;

	sIndex=form.selectedIndex;

	if (sIndex>0){
		return true
	}else{
		return false
	}
}

//檢查台式身份證
/*
英文代號 - X 
       A=10  台北市       J=18 新竹縣         S=26  高雄縣
       B=11  台中市       K=19 苗栗縣         T=27  屏東縣
       C=12  基隆市       L=20 台中縣         U=28  花蓮縣
       D=13  台南市       M=21 南投縣         V=29  台東縣
       E=14  高雄市       N=22 彰化縣         W=32  金門縣
       F=15  台北縣       O=35 新竹市         X=30  澎湖縣
       G=16  宜蘭縣       P=23 雲林縣         Y=31  陽明山
       H=17  桃園縣       Q=24 嘉義縣         Z=33  連江縣
       I=34  嘉義市       R=25 台南縣

性別 - D1
1 - 男性 
2 - 女性 

Y = X1 + 9*X2 + 8*D1 + 7*D2 + 6*D3 + 5*D4 + 4*D5 + 3*D6 + 2*D7+ 1*D8 + D9 
如 Y 能被 10 整除，則表示該身分證號碼為正確，否則為錯誤。 
*/
function checkIDNO(form){
	re = /^[ABCDEFGHJKLMNPQRSTUVXYWZIO]{1}[12]{1}\d{8}$/;
	
	//開頭字母
	var pattens = new Array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");
	//轉換的對照數字
	var tables = new Array(10,11,12,13,14,15,16,17,34,18,19,20,21,22,35,23,24,25,26,27,28,29,32,30,31,33); 
	//form值
	var formStr = form.value;
	//document.write("formStr= " + formStr + "<br />");
	
	//計算開頭字母的值: 十位數字 + 個位數字*9
	var firChar = formStr.substr(0,1);
	var firCharNum = 0;
	var firCharValue = 0;
	//document.write("firChar= " + firChar + "<br />");
	
	for (var i=0;i<=25;i++){
		if (pattens[i] == firChar){
			firCharNum = tables[i];
			break;
		}
	}
	//document.write("firCharNum= " + firCharNum + "<br />");
	
	firCharValue = parseInt(firCharNum.toString().substr(0,1)) + parseInt(firCharNum.toString().substr(1,2))*9;
	
	//document.write(parseInt(firCharNum.toString().substr(0,1)) + "<br />");
	//document.write(parseInt(firCharNum.toString().substr(1,2)) + "<br />");
	
	//document.write("firCharValue= " + firCharValue + "<br />");
	
	//計算性別的值
	var SexValue = parseInt(formStr.substr(1,1))*8;
	//document.write("SexValue= " + SexValue + "<br />");
	
	//計算後七碼的值
	var numCount = 0;
	for (var i=2;i<=8;i++){
		numCount += parseInt(formStr.substr(i,1))*(9-i);
		//document.write(formStr.substr(i,1) + " * " + (9-i) + " = " + (parseInt(formStr.substr(i,1))*(9-i)) + "<br />");
	}
	//document.write("numCount= " + numCount + "<br />");
	
	//計算檢查碼的值
	var lastChar = formStr.substr(formStr.length-1,1);
	//document.write("lastChar= " + lastChar + "<br />");
	var chkNum = 10 - ((firCharValue + SexValue + numCount)%10);
	if (chkNum == 10) chkNum = 0;
	//document.write("chkNum= " + chkNum + "<br />");
	
	//判斷是否正確
	var isTrue = "0";
	var totalValue = firCharValue + SexValue + numCount + parseInt(lastChar);
	//document.write("totalValue= " + totalValue + "<br />");
	if (parseInt(lastChar) == chkNum && totalValue%10 == 0) isTrue = "1";
	//document.write("isTrue= " + isTrue + "<br />");
	//document.write(typeof isTrue + "<br />");
	//document.write(re.test(formStr) + "<br />");
	//document.write(isTrue == 1 + "<br />");
	//document.write(isTrue == '1' + "<br />");

	if (re.test(formStr) && isTrue == "1" && formStr != "A123456789"){
		return true
	}else{
		return false
	}
	
}

