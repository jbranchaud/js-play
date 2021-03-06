/*
 * Modifying Math on the Page
 * http://docs.mathjax.org/en/latest/typeset.html
 *
 * Source Code below from:
 * http://www.onemathematicalcat.org/MathJaxDocumentation/TeXSyntax.htm
 *
 * Furthermore, you can define TeX macros for the web page by modifying the
 * MathJax config as described here:
 * http://docs.mathjax.org/en/v1.1-latest/options/TeX.html
 */

function processCodeDisplay() {
var string = document.getElementById('codeInput').value;
string = "$$" + string + "$$";
document.getElementById('outputDiv').innerHTML = string; // write new problem
MathJax.Hub.Queue(["Typeset",MathJax.Hub,"outputDiv"]);
// MathJax.Hub.Typeset('outputDiv'); // process math
return;
}

function processCodeInline() {
var string = document.getElementById('codeInput').value;
string = "inline $" + string + "$ mode";
document.getElementById('outputDiv').innerHTML = string; // write new problem
MathJax.Hub.Queue(["Typeset",MathJax.Hub,"outputDiv"]);
return;
}

function toggle(divID) {
if (document.getElementById(divID).style.display == 'none') {
document.getElementById(divID).style.display = 'block';
} else {
document.getElementById(divID).style.display = 'none';
}
}

