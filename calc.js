/*
 * Implement all your JavaScript in this file!
 */
 let operand;
 let nums = [];
 let newNum = true;
 let lastNum;
 let lastOperand;

 // clear page and reset everything
 function clearPage() {
   operand = undefined;
   nums = [];
   newNum = true;
   $("#display").val("");
 }

 function calculate() {
   // has to reset operand to undefined when finished
   let result = Number(nums[0]);
   lastNum = nums[1];
   lastOperand = operand;
   switch(operand) {
     case 'addButton':
       result += Number(nums[1]);
       break;
     case 'subtractButton':
       result -= Number(nums[1]);
       break;
     case 'multiplyButton':
       result *= Number(nums[1]);
       break;
     case 'divideButton':
       result /= Number(nums[1]);
       break;
   }
   clearPage();
   $("#display").val(result);
   nums.push(result);
 }
 // clear display on refresh
 $(document).ready(clearPage);

 // clear button
 $("#clearButton").on("click", clearPage);

 // number: concatenate to current number
 $("button.num").on("click", function() {
   // start a new number if:
   //   there are no numbers in nums
   //   or there is 1 number in nums && there is no operand
   //   i.e. when the first number is the result of the last calculation
   //   and the user does not click an operand before moving to the next
   if (newNum && operand === undefined) {
     clearPage();
   }
   if(newNum) {
     nums.push($(this).val());
     newNum = false;
   }
   // if nums has a number, concatenate new digit
   else {
     nums[nums.length - 1] += $(this).val();
   }

   // display current number
   $("#display").val(nums[nums.length - 1]);
 })

// operand:
//          one number, nothing to calculate
//          two numbers, calculate, store number in nums, reset operand
$("button.operand").on("click", function() {
  if (operand !== undefined && nums.length === 2) {
    // call calculate
    calculate();
  }
  else {
    newNum = true;
  }
  operand = (this.id);
})

// equals button
$("#equalsButton").on("click", function() {
  if (nums.length === 2) {
    calculate();
  }
  else if (nums.length === 1 && operand === undefined) {
    nums.push(lastNum);
    operand = lastOperand;
    calculate();
  }
})
