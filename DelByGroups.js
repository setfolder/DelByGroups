// DelByGroups.js
// Deleting by groups of characters - how it should be (by Ctrl+BackSpace)

// Get the handle of the current editing window
var hWndEdit = AkelPad.GetEditWnd();
if (!hWndEdit) WScript.Quit();

// Cursor position
var lp = AkelPad.GetSelStart();

// If the cursor is at the beginning of the text, exit
if (lp === 0) WScript.Quit();

// Get the text to the left of the cursor
var text = AkelPad.GetTextRange(0, lp);

// Last character
var lastChar = text.charAt(text.length - 1);

// Determine the group type
var spaces      = /^[ \t\n\r]+$/;
var lettersNums = /^[A-Za-zА-Яа-яЁё0-9]+$/;
var nonLetters  = /^[^A-Za-zА-Яа-яЁё0-9]+$/;

// Function to check which group a symbol belongs to
function charType(ch) {
    if (spaces.test(ch)) return "space";
    if (lettersNums.test(ch)) return "word";
    return "nonword";
}

// Determine the group of the last character
var group = charType(lastChar);

// Move left while symbols belong to the same group
var i = text.length - 1;
while (i >= 0 && charType(text.charAt(i)) === group) {
    i--;
}

// Remove from the found position +1 to the cursor
AkelPad.SetSel(i + 1, lp);
AkelPad.ReplaceSel("");
