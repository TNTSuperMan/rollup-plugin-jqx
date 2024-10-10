const h = (arr)=>{
    let elm = document.createElement(arr[0]);
    arr[1].forEach(e=>e[0]?elm.setAttribute(e[0],e[1]??""):0)
    arr[2].forEach(e=>elm.appendChild(Array.isArray(e)?h(e):new Text(e??"")))
    return elm;
}
