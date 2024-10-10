const jqx = require("./src/index")()
let a = jqx.transform(`
<div>
<h2>Hello</h2>
<p>is this good?<br>Answer:<span style="color:red">Red♪</span></p>
</div>
`,".jqx").code
console.log(a)

const h=A=>"<"+A[0]+A[2].map((A=>" "+A[0]+(A[1]?"='"+encodeURIComponent(A[1])+"'":""))).join("")+">"+A[1].map((A=>Array.isArray(A)?h(A):A)).join("")+(-1=="AREA,BASE,BR,COL,EMBED,HR,IMG,INPUT,LINK,META,PARAM,SOURCE,TRACK,WBR".split(",").indexOf(A[0])?"</"+A[0]+">":"");

console.log(h(a))