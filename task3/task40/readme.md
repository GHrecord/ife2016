使用示例：

```
<label for="j_Date1"></label><input type="text" id="j_Date1" class="input">
<label for="j_Date2"></label><input type="text" id="j_Date2" class="input">
<script type="text/javascript">
var myDate1 = new Calender({
id: 'j_Date1',
isSelect: false
});
var myDate2 = new Calender({
id: 'j_Date2',
isSelect: true
});
</script> ```
需要先创建输入框，传入输入框的引用和是否添加用下拉框选择日期功能，true表示允许，反之则否