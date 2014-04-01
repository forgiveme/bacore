function TextBox_AddToIntValue(targetId,addToValue)
{
    var input = document.getElementById(targetId);
    var textInt = parseInt(input.value);
    if(isNaN(textInt))
    {
        textInt = 0;
    }
    input.value = textInt + addToValue;
}