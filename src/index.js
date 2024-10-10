import { JSDOM } from "jsdom"
function convertElm(elm){
    //Tag, attr, content
    let arr = [elm.tagName,[],[]]
    elm.childNodes.forEach(e=>
        arr[2].push(e.nodeType == 1 ? convertElm(e) : e.nodeValue )
    )
    for(let i = 0;i < elm.attributes.length;i++)
        arr[1].push([
            elm.attributes.item(i)?.nodeName,
            elm.attributes.item(i)?.nodeValue])
    return arr;
}
function genFromSrc(src){
    const dom = new JSDOM(src)
    const doc = dom.window.document
    const script = doc.querySelector("body>script")
    const template = doc.querySelector("body>*:not(script)")
    if(!template) throw new Error("Not found template element")
    return `//By TNTSuperMan's rollup-plugin-jqx
import $ from "jqx";
export default function (props) => {
    //Short element generator(SEG)
    const h=e=>{let t=document.createElement(e[0]);return e[1].forEach((e=>e[0]?t.setAttribute(e[0],e[1]??""):0)),e[2].forEach((e=>t.appendChild(Array.isArray(e)?h(e):new Text(e??"")))),t};

    //Generate base element by SEG
    let $this = $(h(${JSON.stringify(convertElm(template))});
    //Setup script
${script?script.innerHTML:""}
    //Return this
    return $this
}`;
}
export default function(){
    return {
        name: "rollup-plugin-jqx",
        transform(src, id){
            if(/\.jqx$/.test(id)){
                let code = genFromSrc(src)
                console.log(typeof code)
                return `${code}`
                console.log(code)
                return {code,map:null}
            }
        }
    }
}